import type { Project } from '../types';


export { projects };


const projects: Project[] = [
    {
        id: crypto.randomUUID(),
        title: 'Project One',
        description: 'This is a project',
        categories: ['Web Development', 'Frontend'],
        tags: ['react', 'nodejs', 'hono'],
        public: true,
        publishedAt: new Date()
    },
    {
        id: crypto.randomUUID(),
        title: 'Project Two',
        description: 'This is a project',
        categories: ['Web Development', 'Backend'],
        tags: ['react', 'nodejs', 'hono'],
        public: true,
        publishedAt: new Date()
    },
    {
        id: crypto.randomUUID(),
        title: 'Project Three',
        description: 'This is a project',
        categories: ['Web Development', 'Fullstack'],
        tags: ['react', 'nodejs', 'hono'],
        public: true,
        publishedAt: new Date()
    },
    {
        id: crypto.randomUUID(),
        title: 'Project Four',
        description: 'This is a project',
        categories: ['Web Development', 'DevOps'],
        tags: ['react', 'nodejs', 'hono'],
        public: false,
        publishedAt: new Date()
    }
];


// const user1 = {
//     id: '1',
//     name: 'John Doe',
//     email: 'JohnDoe@gmail.com'
// }

// const user2 = {
//     id: '2',
//     name: 'Jane Doe',
//     email: 'JaneDoe@gmail.com'
// }

// const users = [ user1, user2 ]

// const projectss = [
//     {
//         id: crypto.randomUUID(),
//         title: 'Project One',
//         description: 'This is a project',
//         categories: ['Web Development', 'Frontend'],
//         tags: ['react', 'nodejs', 'hono'],
//         public: true,
//         publishedAt: new Date(),
//         participants: [user1, user2]
//     }
// ];