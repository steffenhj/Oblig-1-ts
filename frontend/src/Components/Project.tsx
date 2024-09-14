

type ProjectProps = {
    name: string;
    description: string;
    catergory: string;
}


function Project(props: ProjectProps) {
    return (
        <>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>{props.catergory}</p>
        </>
    )
}

export default Project