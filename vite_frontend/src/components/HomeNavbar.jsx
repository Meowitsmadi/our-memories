import { Link } from 'react-router-dom';
import "./styling/Navbar.css"

const handleLogout = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate("/")
  };

const HomeNavbar = () => {
    return (
        <header class="navbar">
            <div class="logo">
                <Link to="/">Logo</Link>
            </div> 
            <div class="links">
                <Link to="/home">Home</Link>
                <Link to="/">About</Link>
                <a href="/" onClick={handleLogout}>Logout</a>
            </div>
        </header>
        
    );
}

export default HomeNavbar;