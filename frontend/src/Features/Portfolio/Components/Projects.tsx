import Project from './Project';
import '../../../App.css';

import { Project as ProjectType } from '../Types';



function Projects({ projects, setProjects }: { projects: ProjectType[], setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>> }) {

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

                    {Array.from(new Set(projects.flatMap(project => project.categories))).map((category, index) => (
                        <p key={index}>
                            {category}: {projects.filter(project => project.categories.includes(category)).length}
                        </p>
                    ))}
                </article>
            </section>
        </>
    )
}

export default Projects;