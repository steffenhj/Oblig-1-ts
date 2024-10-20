import { useEffect, useState } from 'react';
import '../App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faUser } from '@fortawesome/free-solid-svg-icons';

function Nav() {
    const [darkMode, setDarkMode] = useState(false);

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
        <nav id="navbar">
            <section>
                    <a href=""><FontAwesomeIcon icon={faUser} size="xl"/> </a>
                    <h1>Steffen Johannessen</h1>
            </section>

            <ul id="navbar-list">
                <li><a href="">About</a></li>
                <li><a href="">Skills</a></li>
                <li><a href="">Resume</a></li>
                <li><a href="">Contact</a></li>
            </ul>

            <button onClick={toggleDarkMode} className="dark-mode-toggle">
                {darkMode ? <FontAwesomeIcon icon={faSun} size="2xl"/> : <FontAwesomeIcon icon={faMoon} size="2xl"/>}
            </button>
        </nav>
    );
}

export default Nav;
