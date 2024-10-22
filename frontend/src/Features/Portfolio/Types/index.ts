import { z } from 'zod';
import { projectSchema } from '../Helpers/schema';




// type Project = {
//     id: string;
//     title: string;
//     description: string;
//     category: string;
//     publishedAt: Date;
// }

export type Project = z.infer<typeof projectSchema>;