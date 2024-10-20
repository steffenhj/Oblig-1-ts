import { useEffect, useState } from 'react';
import '../App.css';
import Nav from './Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons'



export default function Header() {
    

    return (
        <header id="header">
            <section id='top-header'>
                

                <Nav />
            </section>

            <section id='mid-header'>
                <section>
                    <a href=""><FontAwesomeIcon icon={faXTwitter} size="xl"/></a>
                    <a href=""><FontAwesomeIcon icon={faLinkedin} size="xl"/></a>
                    <a href=""><FontAwesomeIcon icon={faGithub} size="xl"/></a>
                </section>
            </section>
            
            <h1>My portfolio</h1>
            <p>Here are some of the projects I have worked on.</p>
        </header>
    )
}