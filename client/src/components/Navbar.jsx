import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <div className="btnLR">
        <Link to="/Register">Register</Link>
        <Link to="/Login">Login</Link>
      </div>
    </nav>
  );
}
