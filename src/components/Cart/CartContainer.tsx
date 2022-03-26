import classes from './CartContainer.module.scss'
import cartIcon from '../../assets/cart.svg'
import closeIcon from '../../assets/close.svg'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import CartItem from './CartItem'

function CartContainer({ setShowCart }: { setShowCart: React.Dispatch<React.SetStateAction<boolean>> }) {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const cartItemsQuantity = useSelector((state: RootState) => state.cart.totalQuantity)
  const cartItemsPrice = useSelector((state: RootState) => state.cart.totalCartPrice)
  return (
    <motion.div
      className={classes['cart-container']}
      animate={{ x: 0 }}
      initial={{ x: 500 }}
      exit={{ x: 500 }}
      transition={{ duration: 0.7 }}
    >
      <div className={classes['title-container']}>
        <div className={classes['cart-counter']}>
          <img src={cartIcon} alt="cartIcoc" />
          <h5>{`${cartItemsQuantity} ${cartItemsQuantity > 1 ? 'Worskops' : 'Workshop'}`}</h5>
        </div>
        <motion.img
          onClick={() => setShowCart(false)}
          whileTap={{ scale: 1.1 }}
          className={classes['close-icon']}
          src={closeIcon}
          alt="closeIcon"
        />
      </div>
      <AnimatePresence>
        <motion.div layout key={'cart'}>
          {cartItems.map((item) => (
            <motion.div style={{ width: '100%' }} layout key={item.id}>
              <CartItem item={item} />
            </motion.div>
          ))}
          <motion.div layoutId="cart-info" className={classes['cart-infor-container']}>
            <h5>SUBTOTAL</h5>
            <h2>
              {cartItemsPrice.toFixed(2).replace('.', ',')}
              <span>EUR</span>
            </h2>
            <motion.button>Checkout</motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default CartContainer
