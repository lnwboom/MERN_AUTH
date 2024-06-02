import React, { useEffect, useContext } from 'react';
import { UserContext } from "../../context/userContext"

export default function Home() {
  const { user } = React.useContext(UserContext);

  return (
    <div>
      <h1>Welcome !!</h1>
      {!!user && <h2>Hi {user.name} !</h2>}
    </div>
  );
}