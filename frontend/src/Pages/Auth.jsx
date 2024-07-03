import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Auth() {
 
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8" style={{ height: 'calc(100vh - 100px)' }}>
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-foreground">
            Welcome to FUSION
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Get started by creating an account or logging in.
          </p>
        </div>
        <div className="space-y-4">
          <Button className="w-full" onClick={() => navigate('/signup')}>Create Your Account</Button>
          <Button variant="outline"  className="w-full" onClick={() => navigate('/signin')}>
            Login
          </Button>

          <Button variant="outline"  className="w-full" onClick={() => navigate('/home')}>
            Or Enter As Guest
          </Button>
        </div>
      </div>
    </div>
  );
}
