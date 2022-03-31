import classes from './Header.module.scss'
import logo from '../../assets/tinel.png'
import cart from '../../assets/cart.svg'
import blueIcon from '../../assets/blueinfo.png'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CartContainer from './Cart/CartContainer'
import CheckoutModal from './Checkout/CheckoutModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useNavigate } from 'react-router'
import { CART_TYPE } from '../Reusables/reuasblEnums'
import { cartActions } from '../../store/cartStore'

function Header() {
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity)
  const [showCart, setShowCart] = useState(false)
  const [checkoutModal, setCheckoutModal] = useState(false)
  const navigate = useNavigate()

  //Aditional feature (notifaction if costumer wants to add more than 99 single workshops to basket)
  const toManyitems = useSelector((state: RootState) => state.cart.toManyitems)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!toManyitems) {
      return
    }
    const timer = setTimeout(() => {
      dispatch(cartActions.resetToManyitems())
    }, 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [toManyitems, dispatch])

  //For add to cart button notification
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
  const cartClasses = `${classes['cart-info-container']} ${btnIsHighlighted ? classes.bump : ''}`

  useEffect(() => {
    if (totalQuantity === 0) {
      return
    }
    setBtnIsHighlighted(true)
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [totalQuantity])

  return (
    <div className={classes['header-container']}>
      <img onClick={() => navigate('/workshop')} src={logo} alt="tinel-logo" />
      <div onClick={() => setShowCart(true)} className={cartClasses}>
        <div className={classes['cart-icon']}>
          <img src={cart} alt="cart" />
          {totalQuantity !== 0 && <span className={classes.notification}>{totalQuantity}</span>}
        </div>
        {totalQuantity === 0 && <h6>Cart is empty</h6>}
        {totalQuantity !== 0 && (
          <h6>{`${totalQuantity} ${totalQuantity === 1 ? CART_TYPE.SINGLE : CART_TYPE.PLURAL} in Cart`}</h6>
        )}
      </div>
      <AnimatePresence>
        {showCart && <CartContainer setShowCart={setShowCart} setCheckoutModal={setCheckoutModal} />}
      </AnimatePresence>
      <AnimatePresence>{checkoutModal && <CheckoutModal setCheckoutModal={setCheckoutModal} />}</AnimatePresence>
      <AnimatePresence>
        {toManyitems && (
          <motion.div
            className={classes['toast-container']}
            animate={{ x: 0 }}
            initial={{ x: -500 }}
            exit={{ x: -500 }}
          >
            <img src={blueIcon} alt="blue-icon" /> <p>You can only have up to 99 items per workshop</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Header
