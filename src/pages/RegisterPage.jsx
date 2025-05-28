
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Register from '../components/Auth/Register';
import Header from '../components/Header';

const RegisterPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <Header />
      <div className="container auth-page">
        <Register />
      </div>
    </>
  );
};

export default RegisterPage;