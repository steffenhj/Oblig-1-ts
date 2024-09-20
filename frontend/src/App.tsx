import './App.css'
import Header from './Components/Header.tsx'
import Experiences from './Components/Experiences.tsx'
import Contact from './Components/Contact.tsx'
import Projects from './Components/Projects.tsx'
import CreateProject from './Components/CreateProject.tsx'
import { useEffect, useState } from 'react'
import { ofetch } from 'ofetch'

type Project = {
  name: string;
  description: string;
  category: string;
}



function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  
  const student = 'Halgeir Geirson'
  const degree = 'Bachelor IT'
  const points = 180
  
  const experiences = [
    'Figma UI for customer X',
    'Website for customer Y',
    'Mobile app for customer Z'
  ];

  const email = 'student@hiof.no'


  const initializeData = () => {
    console.log('fetching data')
    ofetch('http://localhost:3999/projects').then(
      (projects: Project[]) => {
        console.log('data fetched')
        setProjects(projects)
        console.log('data initialized');
        console.log('projects', projects);
      }
    )
  }

  useEffect(() => {
    initializeData();
  }, [])

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
