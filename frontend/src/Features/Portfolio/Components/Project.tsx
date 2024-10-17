import '../../../App.css';

import { Project as ProjectType } from '../Types'
import { formatDistance } from '../Helpers/format';


function Project({ props, setProjects }: {props: ProjectType, setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>} ) {
    const { title, description, category, publishedAt } = props
    const formatedDate = formatDistance(publishedAt)

    const removeProject = () => {
        setProjects((prevProjects) => prevProjects.filter((project) => project.title !== title))
    }
    
    return (
        <>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{category}</p>
            <p>Published: {formatedDate}</p>
            <button onClick={removeProject}>Remove project</button>
        </>
    )
}

export default Project