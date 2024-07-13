import { useState, useReducer } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthData } from "../utils/AuthWrapper.jsx";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const { login } = AuthData();

  const [formData, setFormData] = useReducer(
    (formData, newItem) => ({ ...formData, ...newItem }),
    { username: "", password: "" }
  );

  const [errorMessage, setErrorMessage] = useState(null);

  const onHandleClick = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      navigate("/home");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="flex h-screen w-full items-start justify-center mt-6 bg-background dark:bg-black">
      <div className="w-full mt-16 max-w-md rounded-2xl bg-card dark:bg-gray-800 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="mb-6 flex flex-col items-center justify-center">
          <div className="flex items-center mb-2">
            <FlameIcon className="h-6 w-6" />
            <span className="ml-2 text-2xl font-bold dark:text-white">FUSION</span>
          </div>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Enter Your Username</p>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Password is "password"</p>
        </div>
        <form className="space-y-4" onSubmit={onHandleClick}>
          <div className="grid gap-2">
            <Label htmlFor="username" className="dark:text-gray-400">Username</Label>
            <Input
              value={formData.username}
              onChange={(e) => setFormData({ username: e.target.value })}
              type="text"
              id="username"
              placeholder="Enter your username"
              className="h-12 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="dark:text-gray-400">Password</Label>
            <Input
              value={formData.password}
              onChange={(e) => setFormData({ password: e.target.value })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="h-12 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <Button
            type="submit"
            className="w-full animate-bounce bg-primary text-primary-foreground dark:bg-gray-900 dark:text-white"
          >
            Sign In
          </Button>
        </form>
        {errorMessage && <p className="mt-4 text-center text-red-600 dark:text-red-400">{errorMessage}</p>}
      </div>
    </div>
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
      className="text-current dark:text-white"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
