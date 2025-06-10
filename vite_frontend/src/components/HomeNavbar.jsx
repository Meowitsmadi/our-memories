import { Link } from 'react-router-dom';
import "./styling/Navbar.css"

const handleLogout = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate("/")
  };

const HomeNavbar = () => {
    return (
        <header className="navbar">
            <div style = {{height: '24px'}} className="logo">
                <Link>Logo</Link>
            </div> 
            <div className="links">
                <Link to="/home">Home</Link>
                <Link>About</Link>
                <a href="/" onClick={handleLogout}>Logout</a>
            </div>
        </header>
        
    );
}

export default HomeNavbar;