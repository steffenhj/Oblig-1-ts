import Project from './Project';

type ProjectType = {
    name: string;
    description: string;
    category: string;
}



function Projects({ projects, setProjects }: { projects: ProjectType[], setProjects: React.Dispatch<React.SetStateAction<Project[]>> }) {
    return (
        <section>
            <h2>Projects: </h2>

            {projects && projects.length > 0 ? (
                <>
                    {projects.map((project, index) => (
                        <article key={index}>
                            <Project props={project} setProjects={setProjects} />
                        </article>
                    ))}

                    <h3>Category summary</h3>
                    <article>
                        {Array.from(new Set(projects.map(project => project.category))).map(category => (
                            <p key={category}>
                                {category}: {projects.filter(project => project.category === category).length}
                            </p>
                        ))}
                    </article>
                </>
            ) : (
                <p>No projects</p>
            )}

        </section>
    )
}

export default Projects;