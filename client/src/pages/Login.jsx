
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext';
import React from 'react';


export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success('Successfully Login. Welcome!!');
        // Update the UserContext with the logged-in user data
        setUser(data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email "
          value={data.email}
          onChange={handleInputChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={data.password}
          onChange={handleInputChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
