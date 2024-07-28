import { useEffect } from 'react';
import './App.css'
import { useAuth } from './context/authContext';
import { useUserContext } from './context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from './api/axios';
import { toast } from 'sonner';
import { Button } from './components/ui/button';
import { CheckCircle2, LogOut } from 'lucide-react';

function App() {

  const { isLoggedIn, logout } = useAuth();
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      axios.get("/getUser")
        .then((res: any) => {
          if (res.data.success) {
            setUser(res.data.user)
          }
        })
        .catch((err: any) => {
          toast.info("Error fetching user data");
          if (err.message === "Go to login") {
            navigate("/login");
          }
          console.log(err);
        })
    }
    if (user !== null) {
      console.log(user);
    }
  }, [isLoggedIn]);

  return (
    <>
      <main className='bg-slate-50 h-screen p-4 md:p-0 flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center border p-4 rounded-lg shadow-2xl'>
          <div className='rounded-full shadow-lg bg-red-600'>
            <img className='rounded-full object-fill w-48 h-48' src={user?.profileImage} alt="prof" />
          </div>
          <div>
            <p className='p-4'><span className='font-bold text-md'>Name: </span><span className='font-semibold text-md'>{user?.username}</span></p>
            <p className='p-4'><span className='font-bold text-md'>Email: </span><span className='font-semibold text-md'>{user?.email}</span></p>
            <p className='p-4'><span className='font-bold text-md'>IsVerified: </span><span className='font-semibold text-md'>{user?.isVerified === true ? <p className='flex items-center'>True <CheckCircle2 size={20} color="green" /></p> : "False"}</span></p>
            <p className='p-4'><span className='flex font-bold text-md'>IsVerified: </span><span className='font-semibold text-md'>{user?.isVerified === true ? <CheckCircle2 size={20} color="green" /> : "False"}</span></p>
          </div>
          <div>
            <Button onClick={logout} className='flex space-x-2'><span className='font-bold'>Logout</span> <LogOut className='w-5 h-5' color='red' /></Button>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
