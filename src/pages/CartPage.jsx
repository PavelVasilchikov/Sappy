
import { ProtectedRoute } from '../components/ProtectedRoute';
import Cart from '../components/Cart';
import Header from '../components/Header';

const CartPage = () => {
  return (
    <ProtectedRoute>
      <>
        <Header />
        <div className="container">
          <Cart />
        </div>
      </>
    </ProtectedRoute>
  );
};

export default CartPage;