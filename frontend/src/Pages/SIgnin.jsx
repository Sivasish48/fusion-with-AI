import { useState ,useReducer} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthData } from "../utils/AuthWrapper.jsx"
import { useNavigate } from "react-router-dom";
export default function Signin() {

  const navigate = useNavigate();
     const { login } = AuthData();

     const [ formData, setFormData ] = useReducer((formData, newItem) => { return ( {...formData, ...newItem} )}, {username: "", password: ""})

 
     const [ errorMessage, setErrorMessage ] = useState(null)

     const onHandleClick = async(e) => {
          e.preventDefault()
          try {
               
            await login(formData.username, formData.password)
            navigate("/home")

       } catch (error) {

            setErrorMessage(error)
            
       }
       
  }

  return (
    <div className="flex h-screen w-full items-start justify-center mt-6 bg-background">
      <div className="w-full mt-16 max-w-md rounded-2xl bg-card p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="mb-6 flex items-center justify-center">
          <FlameIcon className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">FUSION</span>
        </div>
        <form className="space-y-4" onSubmit={onHandleClick}>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <input value={formData.userName} onChange={(e) => setFormData({username: e.target.value}) } type="text"/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <input value={formData.password} onChange={(e) => setFormData({password: e.target.value}) } type="password"/>
          </div>
          <Button type="submit" className="w-full animate-bounce bg-primary text-primary-foreground">
            Sign In
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="/signup" className="font-medium underline underline-offset-4">
            Sign up here
          </a>
        </div>
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
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
