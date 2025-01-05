import { Link } from 'react-router-dom';
import "./styling/Navbar.css"

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="logo">
                <Link to="/">Logo</Link>
            </div> 
            <div className="links">
                <Link to="/">About</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </header>
        
    );
}

export default Navbar;