import { useState } from "react";
import '../App.css'

type Project = {
    name: string;
    description: string;
    category: string;
}

function CreateProject({ setProjects }: { setProjects: React.Dispatch<React.SetStateAction<Project[]>> }) {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    // const [projects, setProjects] = useState<Project[]>([]);


    const updateName = (e: React.FormEvent<HTMLInputElement>) => {
        setName((e.target as HTMLInputElement).value)
        console.log(name)
    };

    const updateDescription = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setDescription((e.target as HTMLTextAreaElement).value)
        console.log(description)
    }

    const updateCategory = (e: React.FormEvent<HTMLInputElement>) => {
        setCategory((e.target as HTMLInputElement).value)
        console.log(name)
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement | null;
        console.log(`Name: ${name}, Description: ${description}, Category: ${category}`)
        if (!form) return;

        const formData = new FormData(form);
        
        const nameInput = formData.get('project-name') as string;
        if (!nameInput || typeof nameInput !== 'string') {
            alert('Name is required')
            return}
        else if (nameInput.length < 3) {
            alert('Name must be at least 3 characters long');
            return;
        }

        const descriptionInput = formData.get('project-description') as string;
        if (!descriptionInput || typeof descriptionInput !== 'string') {
        alert('Description is required') 
        return}
        else if (descriptionInput.length < 10) {
            alert('Description must be at least 10 characters long');
            return;}

        const categoryInput = formData.get('project-category') as string;
        if (!categoryInput || typeof categoryInput !== 'string') 
            {alert('Category is required') 
            return
        }
        else if (categoryInput.length < 3) {
            alert('Category must be at least 3 characters long');
            return;
        }

        setProjects((prevProjects) => [...prevProjects, 
        { name: nameInput, description: descriptionInput, category: categoryInput }]);

        setName('');
        setDescription('');
        setCategory('');
        form.reset();
    }


    return (
        <>
        <h2>Create Project</h2>
        
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
                    <input className="form-input" id="project-category" name="project-category" type="text" 
                    value={category} onChange={updateCategory} />
                </label>
                <button className="form-button" type="submit" >Add Project</button>
            </form>
        </>
    )
}

export default CreateProject