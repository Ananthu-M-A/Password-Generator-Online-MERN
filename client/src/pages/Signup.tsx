import Header from '../components/Header'
import Footer from '../components/Footer'
import SignupForm from '../components/SignupForm'
import { useEffect } from 'react';
import { useAppContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn ? navigate('/') : navigate('/create-account');
  }, [isLoggedIn])
  
  return (
    <>
      <Header />
      <SignupForm />
      <Footer />
    </>
  )
}

export default Signup
