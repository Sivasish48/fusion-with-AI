import React from 'react';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { CircleUser } from 'lucide-react';

export default function Header() {
  const { user, isAuthenticated, isLoading, logout } = useKindeAuth();

  // Use a ternary operator for conditional rendering
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6 bg-white">
      <a href="#" className="flex items-center gap-2" prefetch={false}>
        <FlameIcon className="h-6 w-6" />
        <span className="font-bold text-3xl">Fusion</span>
      </a>

      {isLoading && <p>Loading...</p>}

      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <CircleUser className="h-10 w-10" />
          <button onClick={logout} className="px-4 py-2 bg-black text-white rounded-md">
            Logout
          </button>
         
        </div>
      ) : null}
    </header>
  );
}

function FlameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
