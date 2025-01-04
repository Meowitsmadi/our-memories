import { Link } from 'react-router-dom';
import "./styling/Navbar.css"

const handleLogout = async () => {
    await AsyncStorage.removeItem("access_token");
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
                <Link to="/">Logout</Link>
            </div>
        </header>
        
    );
}

export default HomeNavbar;