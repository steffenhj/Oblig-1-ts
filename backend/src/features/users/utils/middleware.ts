import type { MiddlewareHandler } from "hono";
import { getUser } from "../utils/auth";
import { HTTPException } from "hono/http-exception";

export const authMiddleware = (): MiddlewareHandler => {
    return async function authMiddleware(c, next) {
        const user = getUser(c.req.raw);
        if (!user) throw new HTTPException(401);
        
        c.set("user", user);
        return next();
    };
};

