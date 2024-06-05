import Header from '../components/Header'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'
import { useAppContext } from '../contexts/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    } else if (window.location.pathname !== '/user-login') {
      navigate('/user-login');
    }
  }, [isLoggedIn, navigate]);


  return (
    <>
      <Header />
      <LoginForm />
      <Footer />
    </>
  )
}

export default Login
