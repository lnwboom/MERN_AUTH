import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../../context/userContext";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/logout', { withCredentials: true });
      setUser(null); // Clear the user state after successful logout

      toast.success('Successfully Logout !!');
      navigate("/");
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  return (
    <nav>
      <Link to="/">Home</Link>
      <div className="btnLR">
        {user ? (
          <div className="dropdown">
            <button onClick={toggleDropdown}>
              {user.name} ▼
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <Link to="/dashboard">Dashboard</Link>
                <Link onClick={handleLogout}>Logout</Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/Register">Register</Link>
            <Link to="/Login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}