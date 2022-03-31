import Icon from './Icon'
import cartIcon from '../../assets/cart.svg'
import dateIcon from '../../assets/date.svg'
import clockIcon from '../../assets/clock.svg'
import classes from './GalleryItem.module.scss'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/cartStore'
import { useNavigate } from 'react-router'
import useWindowDimensions from '../../hooks/useWindowDimension'
import { formatToLocalCurrency, formatToLocalDate, formatToLocalTime } from './formaters'
import { WorkshopData } from './reusableInterfaces'
import { DEFAULT_CURRENCY } from './defaultValues'

function GalleryItem({ workshop }: { workshop: WorkshopData }) {
  const { windowWidth } = useWindowDimensions()

  let navigate = useNavigate()
  const dispatch = useDispatch()

  const { id, imageUrl, title, price, category, date } = workshop

  const addItem = () => {
    dispatch(
      cartActions.addItemsToCart({
        id,
        imageUrl,
        title,
        price,
        quantity: 1,
        totalPrice: price,
      })
    )
  }

  return (
    <motion.div
      whileHover={{ boxShadow: '1px 2px 16px rgba(127, 127, 127, 0.35)' }}
      className={classes['gallery-item-container']}
    >
      <div className={classes['image-container']}>
        <img
          onClick={() => {
            navigate(`/workshop/${id}`)
          }}
          className={classes.banner}
          src={imageUrl}
          alt={title}
        />
        <div className={classes['icon-container']}>
          <Icon category={category} classPicker={'icon-shop'} />
        </div>
      </div>
      <div className={classes['info-container']}>
        <div className={classes['time-info']}>
          <div>
            <img loading="lazy" src={dateIcon} alt="date" />
          </div>
          <h6>{formatToLocalDate(date)}</h6>
          <div>
            <img loading="lazy" src={clockIcon} alt="date" />
          </div>
          <h6>{formatToLocalTime(date)}</h6>
        </div>
        <h4
          onClick={() => {
            navigate(`/workshop/${id}`)
          }}
        >
          {title}
        </h4>
        <div className={classes['price-bottun']}>
          <h3>
            {formatToLocalCurrency(price)}
            <span>{DEFAULT_CURRENCY}</span>
          </h3>
          <motion.button onClick={addItem} whileTap={{ scale: 1.1 }}>
            {windowWidth > 650 ? 'Add to Cart' : <img src={cartIcon} alt="cartIcon" />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default GalleryItem
