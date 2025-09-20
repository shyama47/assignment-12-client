import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import AuthProvider from './contexts/AuthContexts/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
const queryClient =new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
 <div className='font-roboto'> 
  <HelmetProvider>
     <AuthProvider>
     <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-right" reverseOrder={false} />
  </QueryClientProvider>
  </AuthProvider>
  </HelmetProvider>
 </div>
  </StrictMode>,
)
