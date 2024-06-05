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
    if (isLoggedIn) {
      navigate('/');
    } else if (window.location.pathname !== '/create-account') {
      navigate('/create-account');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Header />
      <SignupForm />
      <Footer />
    </>
  )
}

export default Signup
