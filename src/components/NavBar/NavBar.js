import React from "react"
import './NavBar.css';
import {FaBars, FaTimes} from 'react-icons/fa'
const NavBar = () => {

    const [clicked, setClicked] = React.useState(false)
    const handleClick = () => setClicked(!clicked)


    return (
        <nav>
            <div className="navbar-container">
                <h1>jakub<span className="blue">iwaszkiewicz</span></h1>
                <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                    <li>
                        <a href="/">Home</a>
                    </li>
                </ul>
                <div className="hamburger" onClick={handleClick}>
                    {clicked ? <FaTimes size={20} style={{color:'#99aab5'}}/> : <FaBars size={20} style={{color:'#99aab5'}}/>}
                </div>

            </div>
        </nav>
    );
}

export default NavBar;