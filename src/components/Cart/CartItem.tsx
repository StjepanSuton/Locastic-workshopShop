import deleteIcon from '../../assets/delete.svg'
import { motion } from 'framer-motion'
import classes from './CartItem.module.scss'
import SelectQuantity from '../Reusables/SelectQuantity'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/cartStore'
interface Item {
  id: number
  imageUrl: string
  price: number
  title: string
  quantity: number
  totalPrice: number
}

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
          <div className={classes['select-container']}>
            <SelectQuantity item={item} />
          </div>
          <h3>
            {totalPrice.toFixed(2).replace('.', ',')}
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
