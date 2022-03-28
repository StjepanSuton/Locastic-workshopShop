import classes from './CartContainer.module.scss'
import cartIcon from '../../../assets/cart.svg'
import closeIcon from '../../../assets/close.svg'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import CartItem from './CartItem'
import { useEffect, useState } from 'react'

function CartContainer({
  setShowCart,
  setCheckoutModal,
}: {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>
  setCheckoutModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  //CartStates
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const cartItemsQuantity = useSelector((state: RootState) => state.cart.totalQuantity)
  const cartItemsPrice = useSelector((state: RootState) => state.cart.totalCartPrice)
  //For cart changeing state animation
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
  const cartClasses = `${classes['cart-counter']} ${btnIsHighlighted ? classes.bump : ''}`
  useEffect(() => {
    if (cartItemsQuantity === 0) {
      return
    }
    setBtnIsHighlighted(true)
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [cartItemsQuantity])

  return (
    <motion.div
      className={classes['cart-container']}
      animate={{ x: 0 }}
      initial={{ x: 500 }}
      exit={{ x: 500 }}
      transition={{ duration: 0.7 }}
    >
      <div className={classes['title-container']}>
        <div className={cartClasses}>
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
            {cartItems.length > 0 ? (
              <motion.button onClick={() => setCheckoutModal(true)}>Checkout</motion.button>
            ) : (
              <h5>Your cart is empty</h5>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default CartContainer
