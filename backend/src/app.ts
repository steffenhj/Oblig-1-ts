import { Hono } from 'hono'
import { cors } from "hono/cors";
import { prettyJSON } from 'hono/pretty-json';

import { User } from './features/users/types/types';
import { type ServerEnv, env } from './lib/env';
import { type DB, db } from './db/db';
import { handleError } from "@/lib/error";
import { makeLogger, type Logger } from './lib/logger';
import { projectController } from './features/projects/controller';

type ContextVariables = {
  user: User | null; 
}

export type ServiceContext = {
  db: DB;
  logger: Logger;
};

export type HonoEnv = {
  Bindings: ServerEnv;
  Variables: {
    services: ServiceContext;
  } & ContextVariables;
};


export const makeApp = (
  database: DB = db,
  logger: Logger = makeLogger({ logLevel: env.LOG_LEVEL, env: env.NODE_ENV })
) => {
  const app = new Hono<HonoEnv>();
  app.use("*", 
    cors({
      origin: `${env.FRONTEND_URL}`,
      credentials: true
    })
  );
  app.use(prettyJSON());
  app.use("*", async (c, next) => {
    c.set("services", {
      logger,
      db: database,
    });

    await next();
  });

  // '/api/v1/projects' endpoint

  app.route("/api/v1/projects", projectController)

  app.onError(handleError);

  return app;
}

const app = makeApp();

export default app