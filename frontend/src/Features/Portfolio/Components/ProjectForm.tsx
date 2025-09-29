import { useState } from "react";
import '../../../App.css';
import { Project } from "../Types";

type ProjectFormProps = {
    onSubmit: (id: string | undefined, project: Project) => void;
};

function ProjectForm({ onSubmit }: ProjectFormProps) {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [participants, setParticipants] = useState<{ id: string; name: string; email: string }[]>([]);
    const [selectedParticipant, setSelectedParticipant] = useState<string>('');

    // Temp users for testing, TODO: Request users from API
    const users = [
        {
            id: "c9b1d5e6-8f3b-4c3b-9f1e-2b7e6b6e1f1a",
            name: "John Doe",
            email: "JohnDoe@gmail.com"
        },
        {
            id: "d4e6f7a8-9b2c-4d3e-8f1e-3b7e6b6e2f2b",
            name: "Jane Doe",
            email: "JaneDoe@gmail.com"
        }
    ];

    const updateName = (e: React.FormEvent<HTMLInputElement>) => {
        setName((e.target as HTMLInputElement).value);
    };

    const updateDescription = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setDescription((e.target as HTMLTextAreaElement).value);
    };

    const updateCategory = (e: React.FormEvent<HTMLInputElement>) => {
        setCategory((e.target as HTMLInputElement).value);
    };

    const handleTagChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setTags(value.split(',').map(tag => tag.trim())); 
    };

    const handlePublicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublic(e.currentTarget.checked);
    };

    const addParticipant = () => {
        if (selectedParticipant) {
            const user = users.find(user => user.id === selectedParticipant);
            if (user && !participants.some(participant => participant.id === user.id)) {
                setParticipants([...participants, { id: user.id, name: user.name, email: user.email }]);
                setSelectedParticipant('');
            }
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement | null;
        if (!form) return;

        const formData = new FormData(form);
        
        const nameInput = formData.get('project-name') as string;
        if (!nameInput || typeof nameInput !== 'string') {
            alert('Name is required');
            return;
        } else if (nameInput.length < 3) {
            alert('Name must be at least 3 characters long');
            return;
        }

        const descriptionInput = formData.get('project-description') as string;
        if (!descriptionInput || typeof descriptionInput !== 'string') {
            alert('Description is required');
            return;
        } else if (descriptionInput.length < 10) {
            alert('Description must be at least 10 characters long');
            return;
        }

        const categoryInput = formData.get('project-category') as string;
        if (!categoryInput || typeof categoryInput !== 'string') {
            alert('Category is required');
            return;
        } else if (categoryInput.length < 3) {
            alert('Category must be at least 3 characters long');
            return;
        }

        const newProject = {
            id: crypto.randomUUID(),
            title: nameInput,
            description: descriptionInput,
            categories: [categoryInput],
            tags: tags,
            public: isPublic,
            publishedAt: isPublic ? new Date().toISOString() : null,
            participants: participants
        };

        onSubmit(undefined, newProject);
        
        setName('');
        setDescription('');
        setCategory('');
        setTags([]);
        setIsPublic(false);
        setParticipants([]);
        form.reset();
    }

    return (
        <>
            <h2>Create Project</h2>
            <pre>
                {JSON.stringify({ name, description, category, tags, isPublic, participants }, null, 2)}
            </pre>
            <form onSubmit={handleSubmit} id="project-form">
                <label htmlFor="project-name">
                    Title:
                    <input className="form-input" id="project-name" name="project-name" type="text" value={name} onChange={updateName} />
                </label>
                <br />
                <label htmlFor="project-description">
                    Project Description:
                    <textarea className="form-textarea" id="project-description" name="project-description" value={description} onChange={updateDescription} />
                </label>
                <br />
                <label htmlFor="project-category">
                    Category:
                    <input className="form-input" id="project-category" name="project-category" type="text" value={category} onChange={updateCategory} />
                </label>
                <br />
                <label>
                    Tags (comma separated):
                    <input className="form-input" type="text" value={tags.join(',')} onChange={handleTagChange} />
                </label>
                <br />
                <label>
                    Public:
                    <input type="checkbox" checked={isPublic} onChange={handlePublicChange} />
                </label>
                <br />
                <label>
                    Participants:
                    <select value={selectedParticipant} onChange={(e) => setSelectedParticipant(e.target.value)}>
                        <option value="" disabled>Select a participant</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <button type="button" onClick={addParticipant}>Add Participant</button>
                </label>
                <br />
                <div>
                    <strong>Participants:</strong>
                    <ul>
                        {participants.map((participant) => (
                            <li key={participant.id}>{participant.name} ({participant.email})</li>
                        ))}
                    </ul>
                </div>
                <button className="form-button" type="submit">Add Project</button>
            </form>
        </>
    )
}

export default ProjectForm;
