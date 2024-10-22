import { ofetch } from 'ofetch'

import { endpoints } from '../../../Config/urls'
import { projectsSchema, validateProject } from '../Helpers/schema'

const url = endpoints.projects

const list = async () => {
    try {
        const projects = await ofetch(url, {
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

export default { list }