import { z } from 'zod';

export { ProjectSchema, ProjectsSchema };

const ProjectSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    publishedAt: z.string().datetime(),
});

const ProjectsSchema = z.array(ProjectSchema);

