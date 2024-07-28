import App from "@/App";
import ForgotPassword from "@/pages/forgotPassword";
import Login from "@/pages/login";
import ResetPassword, { loader as resetTokenLoader } from "@/pages/resetPassword";
import Signup from "@/pages/signup";
import Verify, { loader as tokenLoader } from "@/pages/verify";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/forgotPassword",
        element: <ForgotPassword />
    },
    {
        path: "/resetPassword/:token",
        element: <ResetPassword />,
        loader: resetTokenLoader
    },
    {
        path: "/verify/:token",
        element: <Verify />,
        loader: tokenLoader
    },
    
])