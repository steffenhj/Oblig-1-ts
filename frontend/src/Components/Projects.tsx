import Project from './Project';
import '../App.css';

type ProjectType = {
    name: string;
    description: string;
    category: string;
}



function Projects({ projects, setProjects }: { projects: ProjectType[], setProjects: React.Dispatch<React.SetStateAction<Project[]>> }) {
    return (
        <>
            <section id='projects-section'>
                <h2>Projects: </h2>

                <section id='projects'>
                    {projects && projects.length > 0 ? (
                        <>
                            {projects.map((project, index) => (
                                <article key={index} className='project'>
                                    <Project props={project} setProjects={setProjects} />
                                </article>
                            ))}
                        </>
                    ) : (
                        <p>No projects</p>
                    )}
                </section>

                <article id='projects-summary'>
                    <h2>Category summary</h2>

                    {Array.from(new Set(projects.map(project => project.category))).map(category => (
                        <p key={category}>
                            {category}: {projects.filter(project => project.category === category).length}
                        </p>
                    ))}
                </article>
            </section>
        </>
    )
}

export default Projects;