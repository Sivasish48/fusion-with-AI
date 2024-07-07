import Auth from "@/Pages/Auth";
import Home from "@/Pages/Home";
import Signin from "@/Pages/SIgnin";
import Landing from "@/Pages/Landing";
import  CreateBlog from "@/components/component/CreateBlog.jsx";
export const nav = [
    { path: "/home" , name: "Home" , element: <Home /> ,  isMenu: false  ,  isPrivate: false },
    { path: "/" , name: "Landing" , element: <Landing /> ,  isMenu: false  ,  isPrivate: false }, 
    { path: "/auth" , name: "Auth" , element: <Auth/> ,  isMenu: false  ,  isPrivate: false },  
    { path: "/signin" , name: "Signin" , element: <Signin /> ,  isMenu: false  ,  isPrivate: false },
    { path: "/createblog" , name: "CreateBlog" , element: <CreateBlog /> ,  isMenu: false  ,  isPrivate: true },
]