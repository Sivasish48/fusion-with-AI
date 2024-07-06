import React from 'react';
import { AuthData } from "../utils/AuthWrapper.jsx";

function Home() {
  const { user } = AuthData();
  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-2xl font-bold">Username: {user.name}</p>
    </div>
  );
}

export default Home;
