import './App.css'
import Header from './Components/Header.tsx'
import Experiences from './Components/Experiences.tsx'
import Contact from './Components/Contact.tsx'
import Projects from './Components/Projects.tsx'
import CreateProject from './Components/CreateProject.tsx'
import { useState } from 'react'

type Project = {
  name: string;
  description: string;
  category: string;
}

const projectsForState = [
  {
      name: 'Project One',
      description: 'This is a project',
      category: 'Web Development'
  },
  {
      name: 'Project Two',
      description: 'This is a project',
      category: 'Web Development'
  },
  {
      name: 'Project Three',
      description: 'This is a project',
      category: 'Web Development'
  },
  {
      name: 'Project Four',
      description: 'This is a project',
      category: 'Web Development'
  }
];

function App() {
  const [projects, setProjects] = useState<Project[]>(projectsForState);
  
  const student = 'Halgeir Geirson'
  const degree = 'Bachelor IT'
  const points = 180
  
  const experiences = [
    'Figma UI for customer X',
    'Website for customer Y',
    'Mobile app for customer Z'
  ];

  const email = 'student@hiof.no'



  return (
    <>
      <Header student={student} degree={degree} points={points} />
      <Experiences experiences={experiences} />
      <Contact email={email} />
      <Projects projects={projects} setProjects={setProjects} />
      <CreateProject setProjects={setProjects} />
      </>
  )
}

export default App
