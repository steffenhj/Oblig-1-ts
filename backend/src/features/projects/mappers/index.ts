import type { DbProject, Project } from "../types"; 
import type { User } from "@/features/users/types/types";
import { createId } from "@/lib/id";
import { Entries } from "@/types";

export const fromDb = (dbProject: DbProject, participants: User[]): Project => {
  return {
    id: dbProject.id,
    title: dbProject.title,
    description: dbProject.description,
    categories: dbProject.categories.split(","),
    tags: dbProject.tags.split(","),
    public: Boolean(dbProject.public),
    publishedAt: dbProject.published_at ? new Date(dbProject.published_at) : null,
    participants: participants,
  };
};

export const createProject = (project: Partial<Project>): Project => {
    return {
      id: project.id ?? createId(),
      title: project.title ?? "",
      description: project.description ?? "",
      categories: project.categories ?? [],
      tags: project.tags ?? [],
      public: project.public ?? false,
      publishedAt: project.publishedAt ?? null,
      participants: project.participants ?? [],
    };
};

// title, description, categories, tags, public, published_at, participants

export const toDb = (data: Project) => {
    const project = createProject(data);
    const entries = Object.entries(project) as Entries<Project>;
    const dbProject = {} as DbProject;
  
    for (const entry of entries) {
      if (!entry) continue;
      const [key, value] = entry;
      switch (key) {
        case "id":
          dbProject.id = value;
          break;
        case "title":
            dbProject.title = value;
          break;
        case "description":
            dbProject.description = value;
            break;
        case "categories":
          dbProject.categories = value?.join(",");
        break;
        case "tags":
            dbProject.tags = value.join(",");
            break;
        case "public":
            dbProject.public = value ? 1 : 0; 
            break;
        case "publishedAt":
            dbProject.published_at = typeof value === "string" ? new Date(value).toISOString() : value?.toISOString() ?? null;
          break;
        case "participants":
            dbProject.participants = value.map((participant) => participant.id).join(",");
        default:
          break;
      }
    }
    return dbProject;
  };