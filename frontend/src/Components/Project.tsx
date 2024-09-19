

type Project = {
    name: string;
    description: string;
    category: string;
}


function Project({ props, setProjects }: {props: Project, setProjects: React.Dispatch<React.SetStateAction<Project[]>>} ) {

    const removeProject = () => {
        setProjects((prevProjects) => prevProjects.filter((project) => project.name !== props.name))
    }
    
    return (
        <>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>{props.category}</p>
            <button onClick={removeProject}>Remove project</button>
        </>
    )
}

export default Project