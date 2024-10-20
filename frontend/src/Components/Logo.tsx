import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function Logo() {


    return (
        <section id='logo'>
            <a href=""><FontAwesomeIcon icon={faUser} size="xl"/> </a>
            <h1>Steffen </h1>
        </section>
    )
}