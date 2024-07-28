import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from '@/api/axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authContext';

const clientId = import.meta.env.VITE_SOME_GOOGLE_CLIENT_ID!;

const GoogleLoginButton: React.FC = () => {

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSuccess = async (response: any) => {
    try {
      const googleAccessToken = response.credential;

      const result = await axios.post('/googleLogin', { googleAccessToken });
      if (result.data.success) {
        toast.success("Login Successful");
        login(result.data.accessToken, result.data.refreshToken);
        navigate("/");
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        size='large'
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
