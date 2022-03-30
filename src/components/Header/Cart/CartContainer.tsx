import classes from './CartContainer.module.scss'
import cartIcon from '../../../assets/cart.svg'
import closeIcon from '../../../assets/close.svg'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import CartItem from './CartItem'
import { useEffect, useState } from 'react'
import { formatToLocalCurrency } from '../../Reusables/formaters'

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
      initial={{ x: 700 }}
      exit={{ x: 700 }}
      transition={{ duration: 0.7 }}
    >
      <div className={classes['title-container']}>
        <div className={cartClasses}>
          <img src={cartIcon} alt="cartIcon" />
          <h5>{`${cartItemsQuantity} ${cartItemsQuantity === 1 ? 'Worskop' : 'Workshops'}`}</h5>
          {cartItemsQuantity !== 0 && <span className={classes.notification}></span>}
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
            <motion.div className={classes['layout-container']} layout key={item.id}>
              <CartItem item={item} />
            </motion.div>
          ))}

          <motion.div layoutId="cart-info" className={classes['cart-infor-container']}>
            <h5>SUBTOTAL</h5>
            <h2>
              {formatToLocalCurrency(cartItemsPrice)}
              <span>EUR</span>
            </h2>
            {cartItems.length > 0 ? (
              <motion.button
                onClick={() => {
                  setCheckoutModal(true)
                  setShowCart(false)
                }}
              >
                Checkout
              </motion.button>
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
