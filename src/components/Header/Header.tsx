import classes from './Header.module.scss'
import logo from '../../assets/tinel.png'
import cart from '../../assets/cart.svg'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import CartContainer from '../Cart/CartContainer'
function Header() {
  const [showCart, setShowCart] = useState(false)

  return (
    <div className={classes['header-container']}>
      <img src={logo} alt="tinel-logo" />
      <div onClick={() => setShowCart(true)} className={classes['cart-info-container']}>
        <img src={cart} alt="cart" />
        <h6>Cart is empty</h6>
      </div>
      <AnimatePresence>{showCart && <CartContainer setShowCart={setShowCart} />}</AnimatePresence>
    </div>
  )
}

export default Header
