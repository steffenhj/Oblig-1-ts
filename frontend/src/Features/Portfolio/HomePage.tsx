import Experiences from './Components/Experiences';
import Contact from './Components/Contact';
import ProjectForm from './Components/ProjectForm';
import Projects from './Components/Projects';

import useProjects from './Hooks/useProjects';


export default function HomePage() {
  const { status, projects, error, setProjects } = useProjects();



    const experiences = [
        'Figma UI for customer X',
        'Website for customer Y',
        'Mobile app for customer Z'
      ];
    
      const email = 'student@hiof.no'
    
      

      if (status.loading) return <p>Laster...</p>
      if (status.error) return <p>Det skjedde en feil: {error}</p>


      return (
        <>
            <Experiences experiences={experiences} />
            <Contact email={email} />
            <Projects projects={projects} setProjects={setProjects} />
            <ProjectForm setProjects={setProjects} />
        </>
      )

}
