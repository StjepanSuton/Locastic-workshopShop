import classes from './Header.module.scss'
import logo from '../../assets/tinel.png'
import cart from '../../assets/cart.svg'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import CartContainer from './Cart/CartContainer'
import CheckoutModal from './Checkout/CheckoutModal'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useNavigate } from 'react-router'
import { CART_TYPE } from '../Reusables/reuasblEnums'

function Header() {
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity)
  const [showCart, setShowCart] = useState(false)
  const [checkoutModal, setCheckoutModal] = useState(false)
  const navigate = useNavigate()

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
          {totalQuantity !== 0 && <span className={classes.notification}></span>}
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
    </div>
  )
}

export default Header
