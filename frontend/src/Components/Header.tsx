import '../App.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';


export default function Header() {
    

    return (
        <header id="header">

            <section id='header-content'>
                <section id='introduction'>
                    <h1>My portfolio</h1>
                    <p>Here are some of the projects I have worked on.</p>
                </section>
                <section id='social-links'>
                    <a href=""><FontAwesomeIcon icon={faXTwitter} size="xl"/></a>
                    <a href=""><FontAwesomeIcon icon={faLinkedin} size="xl"/></a>
                    <a href=""><FontAwesomeIcon icon={faGithub} size="xl"/></a>
                </section>
            </section>
            
            
        </header>
    )
}