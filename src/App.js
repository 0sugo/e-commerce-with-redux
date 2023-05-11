import { useEffect } from 'react';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotals , getCartItems} from './features/cart/cartSlice';

function App() {
  const { cartItems , isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(()=>{
    dispatch(getCartItems())
  },[]);

  if(isLoading){
    return (<div>Loading ...</div>);
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;