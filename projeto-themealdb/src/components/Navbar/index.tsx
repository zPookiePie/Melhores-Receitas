import './index.scss'
import { FaGithub } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <img src="/logo.webp" alt="Melhores Receitas logo" />
            </div>
            <a href="https://github.com/zPookiePie" target='_blank'>
                <FaGithub/>
            </a>
        </nav>
    )
}

export default Navbar