import type { Project } from '../types';


export { projects };


const projects: Project[] = [
    {
        id: crypto.randomUUID(),
        title: 'Project One',
        description: 'This is a project',
        category: 'Web Development',
        publishedAt: new Date()
    },
    {
        id: crypto.randomUUID(),
        title: 'Project Two',
        description: 'This is a project',
        category: 'Web Development',
        publishedAt: new Date()
    },
    {
        id: crypto.randomUUID(),
        title: 'Project Three',
        description: 'This is a project',
        category: 'Web Development',
        publishedAt: new Date()
    },
    {
        id: crypto.randomUUID(),
        title: 'Project Four',
        description: 'This is a project',
        category: 'Web Development',
        publishedAt: new Date()
    }
  ];