import { useEffect, useState } from 'react';
import '../App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars, faX } from '@fortawesome/free-solid-svg-icons';

function Nav() {
    const [darkMode, setDarkMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    useEffect(() => {
        const theme = window.localStorage.getItem('theme');
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            setDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
        if (!darkMode) {
            document.body.classList.add('dark-mode');
            window.localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            window.localStorage.setItem('theme', 'light');
        }
    };

    return (
        <>
            <nav id="navbar">

                <ul id="navbar-list">
                    <li><a href="">About</a></li>
                    <li><a href="">Skills</a></li>
                    <li><a href="">Resume</a></li>
                    <li><a href="">Contact</a></li>
                </ul>

                <section id='toggle-nav-menu'>
                    <button onClick={toggleMenu}>
                        {isOpen ? <FontAwesomeIcon icon={faX} size="2xl"/> : <FontAwesomeIcon icon={faBars} size="2xl"/>}
                    </button>
                </section>

                <button onClick={toggleDarkMode} className="dark-mode-toggle">
                    {darkMode ? <FontAwesomeIcon icon={faSun} size="2xl"/> : <FontAwesomeIcon icon={faMoon} size="2xl"/>}
                </button>
            </nav>
            {isOpen && (
                <section id='navbar-container'>
                    <ul>
                        <li><a href="">About</a></li>
                        <li><a href="">Skills</a></li>
                        <li><a href="">Resume</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                </section>
            )}
        </>
    );
}

export default Nav;
