import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PageNotFound from './pages/404';
import Show from './pages/Show';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useInstance from './hooks/useInstance';
import { UserContext } from './UserContext';

export default function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    }
  })
  const instance = useInstance()
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    instance.get('/users/current/')
      .then(res => {
        setUser(
          {
            ...res.data,
            token: localStorage.getItem("token")
          }
        )
        setIsLoading(false)
      })
      .catch(() => {
        localStorage.removeItem("token")
        setIsLoading(false)
      })
  }, [])

  return (
    !isLoading ?
    <QueryClientProvider client={client}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <UserContext.Provider value={{ user, setUser }}>
          <div className='flex min-h-screen flex-col justify-between'>
            <Header />
            <div className='w-full flex grow mx-auto md:max-w-7xl lg:max-w-content py-5'>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/show/:slug' element={<Show />} />
                <Route exact path='*' element={<PageNotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </UserContext.Provider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
    : null
  )
}
