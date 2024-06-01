import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('/profile', { withCredentials: true })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        setUser(null);
      });
  }, []);

  const resetUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
}