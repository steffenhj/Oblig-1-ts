import Experiences from './Components/Experiences';
import Contact from './Components/Contact';
import ProjectForm from './Components/ProjectForm';
import Projects from './Components/Projects';

import useProjects from './Hooks/useProjects';
import { HandleMutation, Project } from './Types';

export default function HomePage() {
  const { add, remove, update, status, projects, error } = useProjects();

  const handleProjectMutation: HandleMutation =  (props) => {
    const { action } = props;

    switch (action) {
      case "add":
        add(props.project);
        console.log('add', props.project)
        break;
      case "remove":
        remove(props.id);
        break;
      case "update":
        update(props.id, props.project);
        break;
      default:
        console.log('Unknown action');
    }
  }

  const onSutmit = (id: string | undefined, data: Partial<Project>) => {
    if (id) handleProjectMutation({ action: "update", id, project: data });
    return handleProjectMutation({ action: "add", project: data });
  }

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
            <Projects projects={projects} handleProjectMutation={handleProjectMutation} />
            <ProjectForm onSubmit={onSutmit} />
        </>
      )

}
