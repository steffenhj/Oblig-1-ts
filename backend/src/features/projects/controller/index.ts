import { Hono } from "hono";
import { projectService, type ProjectService } from "../service";
import { errorResponse } from "@/lib/error";
import type { HonoEnv } from "@/app";
import type { Data } from "@/types";
import type { User } from "@/features/users/types/types";
import db from "@/db/db";
import { authMiddleware } from "@/features/users/utils/middleware";


export const createProjectController = (projectService: ProjectService) => {
    const app = new Hono<HonoEnv>();
  
      // Sikrer at routes krever en bruker
    app.use(authMiddleware());
  

    app.get("/", async (c) => {
      const user = c.get("user") as User;
      const query = c.req.query();

      if (user?.role === 'admin') {
        const result = await projectService.list();
        if (!result.success)
            return errorResponse(c, result.error.code, result.error.message);
          console.log("Controller ...result", result)
          return c.json(result);
      } else {
        const result = await projectService.listPublicProjects();
        if (!result.success)
            return errorResponse(c, result.error.code, result.error.message);
          console.log("Controller ...result", result)
          return c.json(result);
      }
    });
  
    app.get("/:id", async (c) => {
      const user = c.get("user") as User;
      const id = c.req.param("id");
      const result = await projectService.getById(id, user.id);
      if (!result.success)
        return errorResponse(c, result.error.code, result.error.message);
      return c.json(result);
    });
  
    app.post("/", async (c) => {
      const user = c.get("user") as User;
      const data = await c.req.json();
      const result = await projectService.create(data);
      if (!result.success)
        return errorResponse(c, result.error.code, result.error.message);
      return c.json<Data<string>>(result, { status: 201 });
    });
  
    //   // Bruker patch for å håndtere PATCH request ved publisering av en vane
    // app.patch("/:id/publish", async (c) => {
    //   const user = c.get("user") as User;
    //   const id = c.req.param("id");
    //   const result = await habitService.publish(id, user.id);
    //   if (!result.success)
    //     return errorResponse(c, result.error.code, result.error.message);
    //   return c.json(result);
    // });
  
    app.patch("/:id", async (c) => {
      const user = c.get("user") as User;
      const id = c.req.param("id");
      const data = await c.req.json();
      console.log("Controller ...data", id, data)
      const result = await projectService.update({ id, ...data, }, user.id);
      if (!result.success)
        return errorResponse(c, result.error.code, result.error.message);
      return c.json(result);
    });
  
    app.delete("/:id", async (c) => {
      const user = c.get("user") as User;
      const id = c.req.param("id");
      const result = await projectService.remove(id, user.id);
      if (!result.success)
        return errorResponse(c, result.error.code, result.error.message);
      return c.json(result);
    });
  
    return app;
  };
  
  // Lager en instanse for å unngå at denne må opprettes alle steder
  export const projectController = createProjectController(projectService);