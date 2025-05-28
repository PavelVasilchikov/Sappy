import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/register.css'; // Создадим новый файл стилей

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    if (!email || !password || !confirmPassword) {
      setError('Пожалуйста, заполните все поля');
      setIsSubmitting(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      setIsSubmitting(false);
      return;
    }
    
    // Имитация задержки для анимации
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    register({ email });
    setIsSubmitting(false);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Создать аккаунт</h2>
          <p>Создайте свой аккаунт Sappy</p>
        </div>
        
        <form onSubmit={handleSubmit} className="register-form">
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
            
            <div className="password-strength">
              <div 
                className={`strength-bar ${password.length > 0 ? 'active' : ''} ${password.length >= 8 ? 'strong' : ''}`}
              ></div>
              <div 
                className={`strength-bar ${password.length > 3 ? 'active' : ''} ${password.length >= 8 ? 'strong' : ''}`}
              ></div>
              <div 
                className={`strength-bar ${password.length > 6 ? 'active' : ''} ${password.length >= 8 ? 'strong' : ''}`}
              ></div>
            </div>
          </div>
          
          <div className="input-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              placeholder=" "
            />
            <label className="input-label">повторите пароль</label>
            {password && confirmPassword && (
              <div className={`password-match ${password === confirmPassword ? 'match' : 'no-match'}`}>
                <svg viewBox="0 0 24 24">
                  {password === confirmPassword ? (
                    <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                  ) : (
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                  )}
                </svg>
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            className={`register-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : (
              <>
                <span>Создать</span>
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
              </>
            )}
          </button>
        </form>
        
        <div className="register-footer">
          <p>Уже есть учетная запись? <a href="/login" className="link">Войти</a></p>
        </div>
      </div>
      
      <div className="register-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="bouquet-animation">
          <div className="flower flower-1">
            <div className="petal"></div>
            <div className="petal"></div>
            <div className="petal"></div>
            <div className="petal"></div>
            <div className="flower-center"></div>
          </div>
          <div className="flower flower-2">
            <div className="petal"></div>
            <div className="petal"></div>
            <div className="petal"></div>
            <div className="petal"></div>
            <div className="flower-center"></div>
          </div>
          <div className="stem"></div>
          <div className="leaf"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;