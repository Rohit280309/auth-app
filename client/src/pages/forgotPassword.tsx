import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useState } from "react"
import axios from "@/api/axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {

  const [email, setEmail] = useState<string>("");
  const [err, setErr] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const patRes = pattern.test(email);
    if (!patRes) {
      setErr(true);
      return;
    }

    axios.post("/sendForgotMail", { email: email })
    .then((res) => {
      if (res.data.success) {
        setLoading(false);
        toast.success("Password reset link send to your mail")
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <section className="bg-slate-50 h-screen p-4 md:p-0 flex items-center justify-center">
      <div className='flex flex-col w-1/2 items-center justify-center border p-4 rounded-lg shadow-2xl'>
        <div className="w-full p-2">
          <label className="font-bold px-1 text-lg" htmlFor="email">Email</label>
          <Input
            className={`${err ? "border-t border-b border-l border-red-600" : ""}`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setErr(false);
              setEmail(e.target.value)
            }}
            onFocus={() => setErr(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit()
              }
            }}
          />
          {err &&
            <p className="text-xs text-red-600">
              Please enter a valid email
            </p>}
          <label className="text-sm px-1 font-semibold" htmlFor="desc">Enter your email to send forgot password link</label>
        </div>
        <div className="p-2">
          <Button onClick={handleSubmit} className='flex font-bold'>
            {
              loading ? 
                <>
                  Sending... &nbsp;<Loader2 size={20} className="animate-spin" /> 
                </>
                : "Send Link"
            }
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword