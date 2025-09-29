import { z } from 'zod';
import { projectSchema, userSchema } from '../Helpers/schema';

export const actions = {
    add: "add",
    remove: "remove",
    update: "update"
} as const;

export type HandleMutationProps = 
    | { 
        action: typeof actions.remove;
        id: string;
     }
    | { 
        action: typeof actions.update;
        id: string;
        project: Partial<Project>;
     }
    | { 
        action: typeof actions.add;
        project: Partial<Project>;
     };


export type HandleMutation = (props: HandleMutationProps) => void;

export type Action = typeof actions;

export type Project = z.infer<typeof projectSchema>;

export type User = z.infer<typeof userSchema>;