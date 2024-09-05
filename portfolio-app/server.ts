import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile, writeFile } from 'node:fs/promises';

const app = new Hono();

app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));

app.get('/json', async (c) => {
    const data = await readFile('./data.json', 'utf-8')
    return c.json(JSON.parse(data))
})

app.post('/json', async (c) => {
    const body = await c.req.text();
    const newProject = JSON.parse(body)
    const data = await readFile('./data.json', 'utf-8')
    const projects = JSON.parse(data)
    projects.push(newProject)
    await writeFile('./data.json', JSON.stringify(projects, null, 2))
    return c.json(newProject)
});

const port = 3999

console.log(`Server running on http://localhost:${port}`)

serve({
    fetch: app.fetch, 
    port,
})

