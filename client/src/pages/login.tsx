import AuthForm from "@/components/AuthForm"

const Login = () => {
  return (
    <section className="h-screen bg-slate-50 p-4 md:p-0 flex items-center justify-center">
        <AuthForm type="login" />
    </section>
  )
}

export default Login