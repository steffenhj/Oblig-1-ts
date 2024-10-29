import { User } from "@/features/users/types/types";

export type Project = {
    id: string;
    title: string;
    description: string;
    categories: string[];
    tags: string[];
    public: boolean;
    publishedAt?: Date | null;
    participants: User[];
  };

  export type DbProject = {
    id: string;
    title: string;
    description: string;
    categories: string;
    tags: string;
    public: number;
    published_at?: string | null;
    participants: string;
  };

export type CreateProjectDto = Pick<
    Project,
    "title" | "description" | "categories" | "tags" | "public" | "publishedAt" | "participants"
>;

export type UpdateProjectDto = Partial<
  Pick<
    Project,
    | "title" | "categories" | "description" | "tags" | "public" | "publishedAt" | "participants"
  >
>;

export const ProjectFields: (keyof Project)[] = [
    "id",
    "title",
    "description",
    "categories",
    "tags",
    "public",
    "publishedAt",
    "participants",
];


export type ProjectKeys = keyof Project;