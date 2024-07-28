import AuthForm from "@/components/AuthForm";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }: any) {
  return params.token
}

const ResetPassword = () => {
  const encodedToken: any = useLoaderData();
  const token: string = decodeURIComponent(encodedToken);

  return (
    <div className="h-screen bg-slate-50 p-4 md:p-0 flex items-center justify-center">
      <AuthForm type="resetPassword" token={token} />
    </div>
  )
}

export default ResetPassword