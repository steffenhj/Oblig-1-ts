import Project from './Project';

const projectOne = {
    name: 'Project One',
    description: 'This is a project',
    category: 'Web Development'
}

const projectTwo = {
    name: 'Project Two',
    description: 'This is a project',
    category: 'Web Development'
}

const projectThree = {
    name: 'Project Three',
    description: 'This is a project',
    category: 'Web Development'
}

const projectFour = {
    name: 'Project Four',
    description: 'This is a project',
    category: 'Web Development'
}


function Projects() {
    return (
        <>
            <Project name={projectOne.name} description={projectOne.description} catergory={projectOne.category}/>
            <Project name={projectTwo.name} description={projectTwo.description} catergory={projectTwo.category}/>
            <Project name={projectThree.name} description={projectThree.description} catergory={projectThree.category}/>
            <Project name={projectFour.name} description={projectFour.description} catergory={projectFour.category}/>
        </>
    )
}

export default Projects;