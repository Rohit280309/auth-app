import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/route.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { Toaster } from 'sonner';
import { UserProvider } from './context/userContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-lrw1ovoh8zkfte2u.us.auth0.com"
      clientId="QObY9xYTBOjRCYKKzOGlg4oS7cAcW0LH"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <AuthProvider>
        <UserProvider>
          <RouterProvider router={router} />
          <Toaster richColors position="top-center" />
        </UserProvider>
      </AuthProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
