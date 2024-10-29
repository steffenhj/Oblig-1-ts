import { ofetch } from 'ofetch'

import { endpoints } from '../../../Config/urls'
import { projectsSchema, validateProject } from '../Helpers/schema'
import { Project } from '../Types';

const projectsUrl = endpoints.projects

const list = async () => {
    try {
        const projects = await ofetch(projectsUrl, {
            credentials: 'include',
        });
        console.log('api.ts ofetch: Response data:', projects.data); 

        console.log('safeParse', projectsSchema.safeParse(projects.data))

        console.log('validateProject', validateProject(projects.data))
        return validateProject(projects.data)
    } catch (error) {
        console.error(error)
    }
};

const remove = async (id: string) => {
    try {
        const response = await ofetch(`${projectsUrl}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        return response;
    } catch (error) {
        console.error(error)
        throw new Error('Error deleting project')
    }
}

const update = async (id: string, data: Partial<Project>) => {
    try {
        await ofetch(`${projectsUrl}/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            body: data
        });
    } catch (error) {
        console.error(error)
    }
}

const create = async (data: Partial<Project>) => {
    try {
        const response = await ofetch(projectsUrl, {
            method: 'POST',
            credentials: 'include',
            body: data
        });

        return response;
    } catch (error) {
        console.error(error)
    }
}


export default { list, remove, update, create }