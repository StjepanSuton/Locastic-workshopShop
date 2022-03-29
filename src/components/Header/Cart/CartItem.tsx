import deleteIcon from '../../../assets/delete.svg'
import { motion } from 'framer-motion'
import classes from './CartItem.module.scss'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../../store/cartStore'
import QuantityDropdown from './QuantityDropdown'
import { formatToLocalCurrency } from '../../Reusables/formaters'
import { Item } from '../../Reusables/reusableInterfaces'

function CartItem({ item }: { item: Item }) {
  const { id, imageUrl, title, totalPrice } = item

  const dispatch = useDispatch()

  const removeItem = () => {
    dispatch(cartActions.removeItemFromCart(id))
  }

  return (
    <motion.div
      className={classes['cart-item-container']}
      animate={{ x: 0 }}
      initial={{ x: 500 }}
      exit={{ x: 500 }}
      transition={{ duration: 0.5 }}
    >
      <div className={classes['img-container']}>
        <img src={imageUrl} alt={title} />
      </div>
      <div className={classes['info-container']}>
        <h4>{title}</h4>
        <div className={classes['quantitiy-container']}>
          <QuantityDropdown item={item} />
          <h3>
            {formatToLocalCurrency(totalPrice)}
            <span>EUR</span>
          </h3>
        </div>
        <motion.div onClick={removeItem} whileTap={{ scale: 1.1 }} className={classes['delete-icon']}>
          <img src={deleteIcon} alt="delte" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CartItem
