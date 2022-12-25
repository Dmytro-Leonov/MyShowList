import { Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { BsGoogle } from 'react-icons/bs';
import { RxExit } from 'react-icons/rx';
import { BiUser } from 'react-icons/bi';
import useInstance from '../hooks/useInstance';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from "react-router-dom";

export default function Header() {
  const instance = useInstance()
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()

  const logIn = useGoogleLogin({
    onSuccess: tokenResponse => {
      instance.post('/users/auth/google/', null, { headers: { 'Authorization': tokenResponse.access_token } })
        .then(res => {
          localStorage.setItem("token", res.data.token)
          window.location.reload()
        })
    },
  });

  const logOut = () => {
    instance.post('/users/logout/')
    setUser(null)
    localStorage.removeItem("token")
    navigate('/')
    window.location.reload()
  };

  return (
    <header className='bg-dark-secondary sticky top-0 z-10'>
      <nav>
        <div className='justify-between mx-auto items-center flex md:max-w-7xl lg:max-w-content'>
          <div className='flex items-center py-5'>
            <Link to={'/'}>
              <h1 className='text-2xl font-bold hover:text-light-secondary transition-colors'>MyShowList </h1>
            </Link>
          </div>
          <div>
            <div className='flex-1 justify-self-center'>
              <div>
                {
                  user ?
                    <div className='flex gap-x-4'>
                      <Link to='/profile' className='nav-button'><BiUser />{user.full_name}</Link>
                      <button onClick={logOut} className='nav-button'><RxExit />Sign Out</button>
                    </div> :
                    <div>
                      <button onClick={logIn} className='nav-button'><BsGoogle />Sign In</button>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header >
  );
}
