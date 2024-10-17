import { ofetch } from 'ofetch'

import { endpoints } from '../../../Config/urls'
import { ProjectsSchema } from '../Helpers/schema'

const url = endpoints.projects

const list = async () => {
    try {
        const projects = await ofetch(url)
        console.log('API Response:', projects); // Log the raw API response
        console.log('Response data:', projects.data); 

        console.log('safeParse', ProjectsSchema.safeParse(projects))

        console.log('.parse', ProjectsSchema.parse(projects))
        return ProjectsSchema.parse(projects)
    } catch (error) {
        console.error(error)
    }
}

export default { list }