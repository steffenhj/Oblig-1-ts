import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";

const app = new Hono()
app.use("*", cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3999
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

const projectsForState = [
  {
      id: 1,
      name: 'Project One',
      description: 'This is a project',
      category: 'Web Development'
  },
  {
      id: 2,
      name: 'Project Two',
      description: 'This is a project',
      category: 'Web Development'
  },
  {
      id: 3,
      name: 'Project Three',
      description: 'This is a project',
      category: 'Web Development'
  },
  {
      id: 4,
      name: 'Project Four',
      description: 'This is a project',
      category: 'Web Development'
  }
];



app.get('/projects', (c) => {
  return c.json(projectsForState)
})