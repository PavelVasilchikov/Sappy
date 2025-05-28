import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [currency, setCurrency] = useState("USD");

  // Загрузка данных из localStorage при старте
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Сохранение корзины в localStorage при её изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const login = (email, password) => {
    // Если передаётся объект (для совместимости)
    if (typeof email === "object" && email !== null) {
      password = email.password;
      email = email.email;
    }

    const safeEmail = typeof email === "string" ? email.trim() : "";

    if (!safeEmail) {
      console.error("Некорректный email");
      return { success: false, error: "Введите корректный email" };
    }

    if (!password) {
      console.error("Не указан пароль");
      return { success: false, error: "Введите пароль" };
    }

    const mockUser = {
      id: 1,
      email: safeEmail,
      name: safeEmail.split("@")[0],
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return { success: true };
  };

  const register = (email, password) => {
    // Аналогичная обработка для регистрации
    if (typeof email === "object" && email !== null) {
      password = email.password;
      email = email.email;
    }

    const safeEmail = typeof email === "string" ? email.trim() : "";

    if (!safeEmail) {
      console.error("Некорректный email");
      return { success: false, error: "Введите корректный email" };
    }

    const mockUser = {
      id: Date.now(),
      email: safeEmail,
      name: safeEmail.split("@")[0],
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return { success: true };
  };

  // Выход
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCart([]);
  };

  // Добавление товара в корзину
  const addToCart = (flower) => {
    const existingItem = cart.find((item) => item.id === flower.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === flower.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...flower, quantity: 1 }]);
    }
    return { success: true };
  };

  // Изменение количества товара
  const updateQuantity = (flowerId, quantity) => {
    setCart(
      cart
        .map((item) => (item.id === flowerId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
    return { success: true };
  };

  // Удаление товара
  const removeItemFromCart = (flowerId) => {
    setCart(cart.filter((item) => item.id !== flowerId));
    return { success: true };
  };

  // Применение промокода
  const applyPromoCode = (code) => {
    if (code.toLowerCase() === "s20") {
      setDiscount(20);
      setPromoMessage("Промокод применён! Скидка 20%");
    } else {
      setDiscount(0);
      setPromoMessage("Неверный промокод");
    }
    return { success: true };
  };

  // Очистка корзины
  const checkout = () => {
    setCart([]);
    setDiscount(0);
    return { success: true };
  };

  // Проверка наличия товара в корзине
  const isInCart = (flowerId) => {
    return cart.some((item) => item.id === flowerId);
  };

  // Получить количество товара
  const getCartItemQuantity = (flowerId) => {
    const item = cart.find((item) => item.id === flowerId);
    return item ? item.quantity : 0;
  };

  // Форматирование цены
  const formatPrice = (price) => {
    if (currency === "RUB") return `${(price * 90).toFixed(2)} ₽`;
    else return `$${price.toFixed(2)}`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        cart,
        addToCart,
        updateQuantity,
        removeItemFromCart,
        isInCart,
        getCartItemQuantity,
        applyPromoCode,
        promoMessage,
        currency,
        setCurrency,
        cartTotal: cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        discount,
        formatPrice,
        checkout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
