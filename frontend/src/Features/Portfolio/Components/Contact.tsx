import React, { useState } from "react";
import '../../../App.css'

type ContactProps = {
    email?: string;
}



function Contact( props: ContactProps ) {
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const { email } = props

    const handleButtonClick = () => {
        alert(email);
    };

    const updateName = (e: React.FormEvent<HTMLInputElement>) => {
        setName((e.target as HTMLInputElement).value)
        console.log(name)
    };

    const updateMessage = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setMessage((e.target as HTMLTextAreaElement).value)
        console.log(message)
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement | null;
        console.log(name, message)

        if (!form) return;  

        const formData = new FormData(form);
        const nameInput = formData.get('name') as string;
        if (!nameInput || typeof nameInput !== 'string') return;
        if (nameInput.length < 3) {
            alert('Name must be at least 3 characters long');
            return;
        }

        const messageInput = formData.get('message') as string;
        if (!messageInput || typeof messageInput !== 'string') return;
        if (messageInput.length < 10) {
            alert('Message must be at least 10 characters long');
            return;
        }


        setName('');
        setMessage('');
        form.reset();
    }

    return (
        <>
            <p>{email}</p>
            <button onClick={handleButtonClick}>Show Email</button>

            <pre>{JSON.stringify({ name, message }, null, 2)}</pre>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Name:
                    <input id="name" name="name" type="text" 
                    value={name} onChange={updateName} />
                </label>
                <br />
                <label htmlFor="message">
                    Message:
                    <textarea id="message" name="message" 
                    value={message} onChange={updateMessage} />
                </label>
                <br />
                <button type="submit" >Send</button>
            </form>
        </>
    )
}

export default Contact


// For kontakte studenten er det ønskelig å ha et lite skjema. Skjema skal ha to felter. Et for navnet til personen og et felt textarea for meldingen.

// Bruk state til å lagre verdiene.
// Det bør være en helt enkel validering av dataen.
// Håndter det å sende skjema. Bruke <pre> og JSON.stringify til å vise dataen som ble sendt inn.
// Resette dataen