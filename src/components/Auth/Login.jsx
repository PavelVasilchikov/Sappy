import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/login.css'; // Создадим новый файл стилей

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      setIsSubmitting(false);
      return;
    }
    
    // Имитация задержки для анимации
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    login({ email, password });
    setIsSubmitting(false);
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>С возвращением</h2>
          <p>Войдите в свой аккаунт Sappy</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message animate__animated animate__shakeX">
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
              </svg>
              {error}
            </div>
          )}
          
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder=" "
            />
            <label className="input-label">адрес электронной почты</label>
          </div>
          
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder=" "
            />
            <label className="input-label">пароль</label>
          </div>
          
          <button 
            type="submit" 
            className={`login-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : (
              <>
                <span>Войти</span>
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                </svg>
              </>
            )}
          </button>
        </form>
        
        <div className="login-footer">
          <p>У вас нет учетной записи? <a href="/register" className="link">Зарегистрироваться</a></p>
        </div>
      </div>
      
      <div className="login-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="flower-animation">
          <div className="petal petal-1"></div>
          <div className="petal petal-2"></div>
          <div className="petal petal-3"></div>
          <div className="petal petal-4"></div>
          <div className="flower-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;