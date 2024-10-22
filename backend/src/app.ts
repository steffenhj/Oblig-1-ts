import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import { projects } from './data/projects'

import { User } from './features/users/types/types';
import { authMiddleware } from './features/users/utils/middleware';

type ContextVariables = {
  user: User | null; 
}

const app = new Hono<{ Variables: ContextVariables}>()

app.use("*", 
  cors({
    origin: "http://localhost:5173",
    credentials: true
  }));

app.get('/', (c) => {
  return c.text('Hello Hono!')
})





app.get('/api/v1/projects', authMiddleware(), async (c) => {

  const user = c.get("user")
  console.log('user', user)

  let visibleProjects;

  if (user?.role === 'admin') {
    visibleProjects = projects
  } else {
    visibleProjects = projects.filter((project) => project.public === true)
  }

  return c.json({
    data: visibleProjects
    
  })
})

export default app