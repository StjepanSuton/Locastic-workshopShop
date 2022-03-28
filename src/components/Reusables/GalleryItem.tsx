import Icon from './Icon'
import dateIcon from '../../assets/date.svg'
import clockIcon from '../../assets/clock.svg'
import classes from './GalleryItem.module.scss'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/cartStore'
import { useNavigate } from 'react-router'
interface WorkshopData {
  category: string
  date: string
  desc: string
  id: number
  imageUrl: string
  price: number
  title: string
  userId: number
}

function GalleryItem({ workshop }: { workshop: WorkshopData }) {
  const navigate = useNavigate()
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
        <img onClick={() => navigate(`/workshop/${id}`)} className={classes.banner} src={imageUrl} alt={title} />
        <div className={classes['icon-container']}>
          <Icon category={category} classPicker={'icon-shop'} />
        </div>
      </div>
      <div className={classes['info-container']}>
        <div className={classes['time-info']}>
          <div>
            <img loading="lazy" src={dateIcon} alt="date" />
          </div>
          <h6>{new Date(date).toLocaleDateString('de-DE').replaceAll('/', '.') + '.'}</h6>
          <div>
            <img loading="lazy" src={clockIcon} alt="date" />
          </div>
          <h6>{new Date(date).toLocaleTimeString('de-DE').slice(0, 5).replaceAll('/', ':')}</h6>
        </div>
        <h4 onClick={() => navigate(`/workshop/${id}`)}>{title}</h4>
        <h3>
          {price.toFixed(2).replace('.', ',')}
          <span>EUR</span>
        </h3>
        <motion.button onClick={addItem} whileTap={{ scale: 1.1 }}>
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  )
}

export default GalleryItem
