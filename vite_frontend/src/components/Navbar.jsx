import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <Link to="/home">Home</Link>
            <Link to="/">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/">Sign Up</Link>
        </div>
    );
}

export default Navbar;