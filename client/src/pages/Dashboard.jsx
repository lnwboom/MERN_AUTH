import { UserContext } from "../../context/userContext"
import React from 'react';


export default function Dashboard() {
    const { user } = React.useContext(UserContext);

    return (
        <div>
            <h1>Dashboard</h1>
            {!!user && <h2>Hi {user.name}!</h2>}
        </div>
    )
}