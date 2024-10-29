import Project from './Project';
import '../../../App.css';

import type { HandleMutation, Project as ProjectType } from '../Types';

type ProjectProps = {
    handleProjectMutation: HandleMutation;
    projects: ProjectType[];
};

function Projects(props: ProjectProps) {
    const { projects = [], handleProjectMutation } = props;
    
    const removeProject = (id: string) => {
        handleProjectMutation({ action: "remove", id });
    }

    return (
        <>
            <section id='projects-section'>
                <h2>Projects: </h2>

                <section id='projects'>
                    {projects && projects.length > 0 ? (
                        <>
                            {projects.map((project, index) => (
                                <article key={index} className='project'>
                                    <Project props={project} removeProject={removeProject} />
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