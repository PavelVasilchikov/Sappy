import { useState } from "react";
import ReactDOM from "react-dom/client";
import { useAuth } from "../context/AuthContext";
import "../styles/flowersCard.css";

const FlowerCard = ({ flower }) => {
  const { user, addToCart, removeItemFromCart, isInCart, getCartItemQuantity } =
    useAuth();
  const [isAdded, setIsAdded] = useState(isInCart(flower.id));
  const quantity = getCartItemQuantity(flower.id);

  const handleAdd = () => {
    if (!user) {
      showNotification("Пожалуйста, войдите, чтобы добавить товар в корзину");
      return;
    }

    addToCart(flower);
    setIsAdded(true);
  };

  const handleRemove = () => {
    removeItemFromCart(flower.id); // ✅ Передаем ID цветка
  };

  return (
    <div className="flower-card">
      <img src={flower.image} alt={flower.name} className="flower-image" />
      <h3>{flower.name}</h3>
      <p className="flower-description">{flower.description}</p>

      <div className="flower-footer">
        <span className="flower-price">
          ${parseFloat(flower.price).toFixed(2)}
        </span>

        {quantity > 0 ? (
          <div className="quantity-controls">
            <button onClick={handleRemove} className="counter-btn">
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button onClick={() => addToCart(flower)} className="counter-btn">
              +
            </button>
          </div>
        ) : (
          <button onClick={handleAdd} className="add-to-cart-btn">
            В корзину
          </button>
        )}
      </div>
    </div>
  );
};

// Компонент уведомления
const Notification = ({ message, onClose }) => (
  <div className="notification">
    <p>{message}</p>
    <button className="close-btn" onClick={onClose}>
      ×
    </button>
  </div>
);

let timeoutId;

const showNotification = (message) => {
  const container = document.getElementById("notification-container");
  if (!container) return;

  clearTimeout(timeoutId);
  container.innerHTML = "";

  const div = document.createElement("div");

  const notification = (
    <Notification
      message={message}
      onClose={() => {
        container.innerHTML = "";
      }}
    />
  );

  ReactDOM.createRoot(div).render(notification);
  container.appendChild(div);

  timeoutId = setTimeout(() => {
    div.remove();
  }, 3000);
};

export default FlowerCard;
