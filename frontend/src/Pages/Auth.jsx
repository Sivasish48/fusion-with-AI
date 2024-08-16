import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/component/theme-provider";
import { HoverBorderGradient } from '../components/hover-border-gradient';
import { Button } from "@/components/ui/button";

export default function Auth() {
  const { theme } = useTheme();
  const navigate = useNavigate();

 

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8" style={{ height: 'calc(100vh - 100px)' }}>
        <div className="mx-auto w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-4 text-center text-3xl font-bold tracking-tight">
              Welcome to FUSION
            </h2>
            <p className="mt-2 text-center text-sm">
              Get started by logging in or as A Guest.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <HoverBorderGradient
              containerClassName="rounded-full w-80 flex justify-center"
              as="button"
              className="dark:bg-black  text-white dark:text-white flex items-center justify-center space-x-2 border border-black hover:bg-black hover:text-white transition duration-300"
              onClick={() => navigate('/signin')}
            >
              Login
            </HoverBorderGradient>
            <HoverBorderGradient
              containerClassName="rounded-full w-80 flex justify-center"
              as="button"
              className="dark:bg-black  text-white dark:text-white flex items-center justify-center space-x-2 border border-black hover:bg-black hover:text-white transition duration-300"
              onClick={() => navigate('/home')}
            >
              Or Enter As Guest
            </HoverBorderGradient>
          </div>
        </div>
      </div>
    </div>
  );
}
