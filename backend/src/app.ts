import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import { projects } from './data/projects'

const app = new Hono()

app.use("*", cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})





app.get('/api/v1/projects', (c) => {
  return c.json(projects)
})

export default app