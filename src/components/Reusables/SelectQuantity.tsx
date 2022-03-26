import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/cartStore'
import classes from './SelectQuantity.module.scss'
interface Item {
  id: number
  imageUrl: string
  price: number
  title: string
  quantity: number
  totalPrice: number
}

function SelectQuantity({ item }: { item: Item }) {
  const { id, imageUrl, price, title, quantity, totalPrice } = item
  const dispatch = useDispatch()

  const changeQuantityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      cartActions.changeItemQuantity({
        id,
        imageUrl,
        title,
        price,
        quantity: parseInt(e.target.value),
        totalPrice: totalPrice,
      })
    )
  }

  return (
    <select className={classes['quantity-container']} value={quantity} onChange={changeQuantityHandler}>
      {[...Array(10).fill(quantity - 5)].map((number, i) =>
        number + i < 1 ? (
          ''
        ) : (
          <option value={number + i} key={id + number + i}>
            {number + i}
          </option>
        )
      )}
    </select>
  )
}

export default SelectQuantity
