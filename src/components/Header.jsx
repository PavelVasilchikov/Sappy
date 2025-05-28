import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/header.css";
import { useEffect } from "react";

const Header = () => {
  const { user, logout, cart } = useAuth();

  useEffect(() => {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
      const handleClick = () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("open");
      };

      menuToggle.addEventListener("click", handleClick);

      // Удаление обработчика при размонтировании компонента
      return () => {
        menuToggle.removeEventListener("click", handleClick);
      };
    }
  }, []);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Sappy
        </Link>

        {/* Бургер-меню */}
        <div className="menu-toggle" id="menuToggle">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Навигационное меню */}
        <nav className="nav" id="navMenu">
          <Link to="/">Главная</Link>
          {user ? (
            <>
              <Link to="/cart">Корзина ({cart.length})</Link>
              <button onClick={logout} className="logout-btn">
                Выйти
              </button>
              <span className="user-email">{user.email}</span>
            </>
          ) : (
            <>
              <Link to="/login">Войти</Link>
              <Link to="/register">Регистрация</Link>
            </>
          )}
        </nav>       
      </div>
    </header>
  );
};

export default Header;