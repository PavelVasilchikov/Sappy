
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Header from '../components/Header';

const LoginPage = () => {
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
        <Login />
      </div>
    </>
  );
};

export default LoginPage;