import React from 'react';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

function Dashboard() {
  const { logout, user, isAuthenticated, isLoading } = useKindeAuth();

  console.log(user);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please sign in or register!</p>
      )}
    </div>
  );
}

export default Dashboard;
