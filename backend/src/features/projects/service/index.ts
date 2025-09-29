import type { Result } from "@/types";
import { createProjectRepository, type ProjectRepository } from "../repository";
import type { CreateProjectDto, Project, UpdateProjectDto } from "../types";
import { ResultHandler } from "@/lib/result";
import { createProject, toDb } from "../mappers";
import db from "@/db/db";


// Factory-funksjon for å opprette en habit-service
export const createProjectService = (projectRepository: ProjectRepository) => {
    const getById = async (
      id: string,
      user_id: string
    ): Promise<Result<Project | undefined>> => {
      return projectRepository.getById(id);
    };
  
    const list = async (): Promise<Result<Project[]>> => {
      return projectRepository.list();
    };

    const listPublicProjects = async (): Promise<Result<Project[]>> => {
        return projectRepository.listPublicProjects();
    };
  
    const create = async (data: CreateProjectDto): Promise<Result<string>> => {
      const project = createProject(data);
  
      // Validerer habit-dataen
      //   if (!isValidHabit(habit)) {
      //     return ResultHandler.failure("Invalid habit data", "BAD_REQUEST");
      //   }
      return projectRepository.create(project);
    };
  
    const update = async (data: UpdateProjectDto, userId: string) => {
        const project = createProject(data);
      
        //   // Validerer habit-dataen
        //   if (!isValidHabit(habit))
        //     return ResultHandler.failure("Invalid habit data", "BAD_REQUEST");
      
        //   // Sjekker om brukeren har rettigheter til å redigere
        //   if (!canEdit(habit, userId))   
        //     return ResultHandler.failure("Can not edit this habit", "UNAUTHORIZED");
        console.log("ProjectService.update", project)
        return projectRepository.update(project);
    };
  
    // // Publiserer en habit
    // const publish = async (id: string, user_id: string) => {
    //   const result = await habitRepository.getById(id, user_id);
    //   if (!result.success)
    //     return ResultHandler.failure(result.error.message, result.error.code);
    //   if (!result.data)
    //     return ResultHandler.failure("Habit not found", "NOT_FOUND");
    //   // Vet at data nå er en vane
    //   const habit = result.data;
    //   return habitRepository.update({ ...habit, publishedAt: new Date() });
    // };
  
    // Sletter en habit
    const remove = async (id: string, user_id: string) => {
      return projectRepository.remove(id);
    };
  
    return { list, create, update, getById, remove, listPublicProjects };
  };
  
  export const projectService = createProjectService(createProjectRepository(db));
  
  export type ProjectService = ReturnType<typeof createProjectService>;