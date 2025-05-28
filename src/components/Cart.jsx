import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/cart.css';
import emailjs from '@emailjs/browser';

const Cart = () => {
  const {
    cart,
    removeItemFromCart,
    updateQuantity,
    cartTotal,
    applyPromoCode,
    promoMessage,
    discount,
    currency,
    setCurrency,
    user,
    setUser
  } = useAuth();

  const [promoCode, setPromoCode] = useState('');
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    address: '',
    contact: '',
    date: '',
    time: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [saveData, setSaveData] = useState(false);
  const formRef = useRef();

  const handleApplyPromo = () => {
    applyPromoCode(promoCode);
  };

  const handleCheckout = () => {
    setIsPaymentFormOpen(true);
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryData(prev => ({ ...prev, [name]: value }));
  };

  const processOrder = () => {
    // Ваша логика обработки заказа
    return new Promise(resolve => setTimeout(resolve, 1500));
  };

  const formatPrice = (price) => {
    if (currency === 'RUB') return `${(price * 90).toFixed(2)} ₽`;
    else return `$${price.toFixed(2)}`;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setOrderStatus('Обработка заказа...');

    try {
      // 1. Сначала обрабатываем заказ
      await processOrder();
  
      
      setOrderStatus('Заказ подтверждён! Письмо отправлено.');
      
    } catch (error) {
      console.error('Ошибка:', error);
      setOrderStatus('Ошибка при оформлении заказа');
    }
  };

  const handleCloseForm = () => {
  setIsPaymentFormOpen(false);
  setOrderStatus('');
};
  

  return (
    <div className="cart-container">
      <h2>Ваша корзина</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">
          {orderStatus || 'Ваша корзина пуста'}
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item slide-in">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{formatPrice(item.price)}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  <p>{formatPrice(item.price * item.quantity)}</p>
                  <button onClick={() => removeItemFromCart(item.id)} className="remove-btn">
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Промокод */}
          <div className="promo-section">
          
            <input
              type="text"
              placeholder="Введите промокод"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="promo-input"
            />
            <button onClick={handleApplyPromo} className="apply-btn">
              Применить
            </button>
            {promoMessage && (
              <p className={`promo-message ${promoMessage.startsWith('✅') ? 'success' : 'error'}`}>
                {promoMessage}
              </p>
            )}
          </div>

          {/* Выбор валюты */}
          <div className="currency-selector">
            <label>
              <input
                type="radio"
                name="currency"
                value="USD"
                checked={currency === 'USD'}
                onChange={() => setCurrency('USD')}
              />
              USD
            </label>
            <label>
              <input
                type="radio"
                name="currency"
                value="RUB"
                checked={currency === 'RUB'}
                onChange={() => setCurrency('RUB')}
              />
              RUB
            </label>
          </div>

          {/* Итого */}
          <div className="cart-summary">
            {discount > 0 && (
              <p className="original-price">
                Итого без скидки: <s>{formatPrice(cartTotal )}</s>
              </p>
            )}
            <h3>Итого: {formatPrice(cartTotal * (1 - discount / 100))}</h3>
            {discount > 0 && <p className="discount-applied">Скидка {discount}% применена!</p>}
            <button className="checkout-btn" onClick={handleCheckout}>
              Оформить заказ
            </button>
          </div>

          {/* Форма оформления заказа */}
          {isPaymentFormOpen && (
            <div className="payment-form fade-in">
              <h4>Оформление заказа</h4>
              
              {/* Данные доставки */}
              <form onSubmit={handlePaymentSubmit}>
                <div className="delivery-section">
                  <h5>Данные доставки</h5>
                  <label>
                    Адрес:
                    <input
                      type="text"
                      name="address"
                      value={deliveryData.address}
                      onChange={handleDeliveryChange}
                      required
                    />
                  </label>
                  <label>
                    Контактный телефон:
                    <input
                      type="text"
                      name="contact"
                      value={deliveryData.contact}
                      onChange={handleDeliveryChange}
                      required
                    />
                  </label>
                  <label>
                    Дата доставки:
                    <input
                      type="date"
                      name="date"
                      value={deliveryData.date}
                      onChange={handleDeliveryChange}
                    />
                  </label>
                  <label>
                    Время доставки:
                    <input
                      type="time"
                      name="time"
                      value={deliveryData.time}
                      onChange={handleDeliveryChange}
                    />
                  </label>
                </div>

                {/* Способ оплаты */}
                <div className="payment-method">
                  <h5>Способ оплаты</h5>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                    />
                    Онлайн-оплата картой
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                    />
                    Оплата при получении
                  </label>

                  {/* Форма оплаты картой (если выбрано) */}
                  {paymentMethod === 'online' && (
                    <div className="card-payment">
                      <label>
                        Номер карты:
                        <input type="text" placeholder="1234 5678 9012 3456" required />
                      </label>
                      <label>
                        Срок действия:
                        <input type="text" placeholder="MM/YY" required />
                      </label>
                      <label>
                        CVV:
                        <input type="text" placeholder="123" required />
                      </label>
                    </div>
                  )}
                </div>

                {/* Сохранение данных */}
                {user && (
                  <label className="save-data">
                    <input
                      type="checkbox"
                      checked={saveData}
                      onChange={() => setSaveData(!saveData)}
                    />
                    Сохранить данные доставки для будущих покупок
                  </label>
                )}

                <button type="submit" className="submit-payment">
                  {orderStatus || 'Подтвердить заказ'}
                </button>
              </form>

              <button 
            className="close-form" 
            onClick={handleCloseForm}
          >
            {/* Иконка закрытия или текст */}
            &times;
          </button>
            </div>
          )}


        </>
      )}
    </div>
  );
};

export default Cart;