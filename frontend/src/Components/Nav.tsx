import '../App.css'

// type HeaderProps = {
//     student?: string;
//     degree?: string;
//     points?: number;
// }

function Nav() {

    return (
        <nav id="navbar">
            <ul id="navbar-list">
                <li><a href="">Steffen Johannessen</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Skills</a></li>
                <li><a href="">Contact</a></li>
            </ul>
            <button>Contact</button>
        </nav>
    )
}

export default Nav