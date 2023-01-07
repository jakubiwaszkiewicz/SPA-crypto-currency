import React from "react"
import './NavBar.css';
import {FaBars, FaTimes} from 'react-icons/fa'
const NavBar = () => {

    const [click, setClick] = React.useState(false)
    const handleClick = () => setClick(!click)


    return (
        <nav>
            <div className="navbar-container">
                <h1>jakub<span className="blue">iwaszkiewicz</span></h1>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li>
                        <a href="/">Home</a>
                    </li>
                </ul>
                <div className="hamburger" onClick={handleClick}>
                    {click ? <FaTimes size={20} style={{color:'#99aab5'}}/> : <FaBars size={20} style={{color:'#99aab5'}}/>}
                </div>

            </div>
        </nav>
    );
}

export default NavBar;