import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import classes from './QuantityDropdown.module.scss'
import arrowDownIcon from '../../../assets/arrowdown.svg'
import { Item } from '../../Reusables/reusableInterfaces'
import QuantityGenerator from '../../Reusables/QuantityGenerator'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../../store/cartStore'

function QuantityDropdown({ item }: { item: Item }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const { quantity } = item

  const { id, imageUrl, title, price } = item

  const dispatch = useDispatch()

  const changeQuantityHandler = (n: number) => {
    dispatch(
      cartActions.changeItemQuantity({
        id,
        imageUrl,
        title,
        price,
        quantity: n,
        totalPrice: n * price,
      })
    )
  }

  return (
    <div className={classes['select-container']} onClick={() => setShowDropdown(!showDropdown)}>
      <div className={classes.select}>
        <h6 className={classes.quantity}>{quantity}</h6>
        <motion.img className={classes['arrow-down']} src={arrowDownIcon} alt="arrow down" />
      </div>
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: -40, opacity: 0 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={classes['options-container']}
          >
            <QuantityGenerator method={changeQuantityHandler} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default QuantityDropdown
