import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext';

export default function Home() {
  const { resetUser } = useContext(UserContext);

  useEffect(() => {
    resetUser();
  }, [resetUser]);

  return (
    <div>
      <h1>Welcome !!</h1>
    </div>
  );
}