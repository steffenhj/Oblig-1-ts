import type { DB } from "@/db/db";
import { Project, DbProject } from "../types";
import { fromDb, toDb } from "../mappers";
import type { Result } from "@/types";
import { ResultHandler } from "@/lib/result";
import { User } from "@/features/users/types/types";
import { validateProject, validateDbProject } from "@/features/helpers";

export const createProjectRepository = (db: DB) => {

  const exist = async (id: string): Promise<boolean> => {
    const query = db.prepare(
      "SELECT COUNT(*) as count FROM projects WHERE id = ?"
    );
    const data = query.get(id) as { count: number };
    return data.count > 0;
  };

  const create = async (data: Project): Promise<Result<string>> => {
    try {
        const Project = toDb(data);
        console.log("ProjectRepository.create", Project)

        const validationResult = validateDbProject(Project);
        if (!validationResult.success) {
            return ResultHandler.failure(validationResult.error.errors, "BAD_REQUEST");
        }

        const query = db.prepare(`
            INSERT INTO projects (id, title, description, categories, tags, public, published_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        
        query.run(
            Project.id,
            Project.title,
            Project.description,
            Project.categories,
            Project.tags,
            Project.public ? 1 : 0,
            Project.published_at
        );

        const insertParticipant = db.prepare(`
            INSERT INTO project_participants (project_id, user_id)
            VALUES (?, ?)
        `);

        for (const participant of data.participants) {
            insertParticipant.run(
                Project.id, 
                participant.id);
        }

        return ResultHandler.success(Project.id);
    } catch (error) {
        return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
};

  const list = async (): Promise<Result<Project[]>> => {
    try {
      const query = db.prepare("SELECT * FROM projects");
      const data = query.all() as DbProject[];

      const projectList: Project[] = [];

        for (const project of data) {
            const participantQuery = db.prepare(`
                SELECT u.id, u.name, u.email
                FROM project_participants pp
                JOIN users u ON pp.user_id = u.id
                WHERE pp.project_id = ?
            `);
            const participants = participantQuery.all(project.id) as User[];

            const mappedProject = fromDb(project, participants);
            projectList.push(mappedProject);
        }

      return ResultHandler.success(projectList);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };


const listPublicProjects = async (): Promise<Result<Project[]>> => {
    try {
      const query = db.prepare("SELECT * FROM projects WHERE public = 1");
      const data = query.all() as DbProject[];
  
      const projectList: Project[] = [];
  
      for (const project of data) {
        const participantQuery = db.prepare(`
          SELECT u.id, u.name, u.email
          FROM project_participants pp
          JOIN users u ON pp.user_id = u.id
          WHERE pp.project_id = ?
        `);
        const participants = participantQuery.all(project.id) as User[];

        const mappedProject = fromDb(project, participants);
        
        projectList.push(mappedProject);
      }
  
      return ResultHandler.success(projectList);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };


const getById = async (id: string): Promise<Result<Project | undefined>> => {
    try {
      const projectExists = await exist(id);
      if (!projectExists) return ResultHandler.failure("Project not found", "NOT_FOUND");
      const query = db.prepare(
        "SELECT * FROM projects WHERE id = ?"
      );
      const data = query.get(id) as DbProject;

      const participantQuery = db.prepare(`
        SELECT u.id, u.name, u.email
        FROM project_participants pp
        JOIN users u ON pp.user_id = u.id
        WHERE pp.project_id = ?
    `);
    const participants = participantQuery.all(id) as User[];

    const project = fromDb(data, participants);

      // TODO: validering av project med Zod kan legges til her
      const validationResult = validateProject(project);
      if (!validationResult.success) {
        return ResultHandler.failure(validationResult.error.errors, "BAD_REQUEST");
      }

      return ResultHandler.success(project);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const update = async (data: Project): Promise<Result<Partial<Project>>> => {
    try {
      const projectExist = await exist(data.id);

      if (!projectExist)
        return ResultHandler.failure("Project not found", "NOT_FOUND");
      const project = toDb(data);

      const query = db.prepare(`
        UPDATE projects
        SET title = ?, description = ?, categories = ?, tags = ?, public = ?, published_at = ?
        WHERE id = ?
      `);

      query.run(
        project.title,
        project.description,
        project.categories,
        project.tags,
        project.public,
        project.published_at,
        project.id
      );

      console.log(data)
      return ResultHandler.success(data);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

const remove = async (id: string): Promise<Result<string>> => {
    try {
      const project = await exist(id);
      if (!project) return ResultHandler.failure("Project not found", "NOT_FOUND");
      const query = db.prepare(
        "DELETE FROM projects WHERE id = ?"
      );
      query.run(id);
      return ResultHandler.success(id);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };


  return { create, list, getById, update, remove, listPublicProjects };
};

export type ProjectRepository = ReturnType<typeof createProjectRepository>;

