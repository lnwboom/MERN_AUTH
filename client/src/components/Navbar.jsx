import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


export default function Navbar() {
  const { user, setUser } = useContext(UserContext);

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

  return (
    <nav>
      <Link to="/">Home</Link>
      <div className="btnLR">
        {user ? (
          <Link onClick={handleLogout}>Logout</Link>
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