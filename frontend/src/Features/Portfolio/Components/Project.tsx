import '../../../App.css';

import { Project as ProjectType } from '../Types'
import { formatDistance } from '../Helpers/format';

type ProjectProps = {
    props: ProjectType;
    removeProject: (id: string) => void;
};

function Project({ props, removeProject }: ProjectProps) {
    const { id, title, description, categories, tags, public: isPublic, publishedAt, participants } = props
    
    return (
        <>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>Categories: {categories.join(', ')}</p>
            <p>Tags: {tags.join(', ')}</p>
            <p>Public: {isPublic ? "Yes" : "No"}</p>
            <p>Published: {publishedAt ? formatDistance(new Date(publishedAt)) : "Not published"}</p>
            <p>Participants: {participants.map(participant => participant.name).join(', ')}</p>
            <button onClick={() => {removeProject(id)}} className='project-button'>Remove project</button>
        </>
    );
}

export default Project