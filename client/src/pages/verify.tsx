import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from '../api/axios';

export async function loader({params}: any) {
    return params.token
}

const Verify = () => {
    const encodedToken: any = useLoaderData();
    const token = decodeURIComponent(encodedToken);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(token)
        axios.post(`/verify`, { token: token })
        .then((res) => {
            if (res.data.success) {
                navigate("/");
                toast.success("Email verified successfully")
            }
        })
        .catch(err => console.log(err));
    }, []);

  return (
    <div className="bg-slate-50 flex flex-col justify-center items-center w-screen h-screen">
        <Loader2 size={250} className="animate-spin" />
        <p className="font-semibold text-14">Please wait while verifying...</p>
    </div>
  )
}

export default Verify