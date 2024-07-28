import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import GoogleLoginButton from "./GoogleLoginButton";
import { toast } from "sonner";
import axios from "@/api/axios";
import { useAuth } from "@/context/authContext";

const AuthForm = ({ type, token }: AuthFormTypes) => {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authFormSchema = (type: string) => z.object({
    username: type === "signup" ? z.string().min(3) : z.string().optional(),
    email: type === "resetPassword" ? z.string().email().optional() : z.string().email(),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, { message: "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character." }),
    confirmPassword: type === "resetPassword" ? z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, { message: "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character." }) : z.string().optional()
  });

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "login") {
        const res = await axios.post("/login", { email: data.email, password: data.password });
        if (res.data.success) {
          toast.success("Login Successful");
          login(res.data.accessToken, res.data.refreshToken);
          navigate("/");
        } else {
          toast.error("Login Failed");
        }
      } else if (type === "signup") {
        if (data.password !== data.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        const res = await axios.post("/signup", { username: data.username, email: data.email, password: data.password });
        if (res.data.success) {
          toast.success("Signup Successful");
          toast.info("Verification mail sent to your email");
          navigate("/login");
        }
      } else if (type === "resetPassword") {
        console.log("Hiii")
        if (data.password !== data.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        const res = await axios.post("/resetPassword", { token: token, password: data.password });
        if (res.data.success) {
          toast.success("Password reset successful");
          navigate("/login");
        }
      }
    } catch (error: any) {
      toast.error("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full md:w-1/2 gap-5 border bg-slate-100 rounded-lg shadow-lg p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {type === "signup" && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <div className="form-item">
                  <FormLabel className="form-label">Username</FormLabel>
                  <div className="flex w-full flex-col">
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        className="input-class"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message mt-2" />
                  </div>
                </div>
              )}
            />
          )}
          {(type === "login" || type === "signup") && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="form-item">
                  <FormLabel className="form-label">Email</FormLabel>
                  <div className="flex w-full flex-col">
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="input-class"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message mt-2" />
                  </div>
                </div>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <div className="form-item">
                <FormLabel className="form-label">Password</FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      className="input-class"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="form-message mt-2" />
                </div>
              </div>
            )}
          />
          {(type === "signup" || type === "resetPassword") && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <div className="form-item">
                  <FormLabel className="form-label">Confirm Password</FormLabel>
                  <div className="flex w-full flex-col">
                    <FormControl>
                      <Input
                        placeholder="Re-Enter your password"
                        className="input-class"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message mt-2" />
                  </div>
                </div>
              )}
            />
          )}
          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                </>
              ) : type === "login" ? (
                "Login"
              ) : type === "signup" ? (
                "Sign Up"
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </form>
      </Form>
      {type === "login" && (
        <p className="flex justify-center text-gray-500 font-semibold p-2">
          <Link to="/forgotPassword">Forgot Password</Link>
        </p>
      )}
      {type !== "resetPassword" && (
        <>
          <p className="flex justify-center text-gray-500 font-semibold p-2">
            {type === "signup" ? "Already have an account? " : "Don't have an account? "}
            <Link className="ml-1" to={type === "signup" ? "/login" : "/signup"}>{type === "signup" ? "Login" : "Signup"}</Link>
          </p>
          <div className="border shadow-lg px-5" />
          <div className="flex items-center w-full justify-center p-5">
            <GoogleLoginButton />
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;
