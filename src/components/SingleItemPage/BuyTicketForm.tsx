import { useState } from 'react'
import { useDispatch } from 'react-redux'
import classes from './BuyTicketForm.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { cartActions } from '../../store/cartStore'
import arrowDownIcon from '../../assets/arrowdown.svg'

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

function BuyTicketForm({ workshop }: { workshop: WorkshopData }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const { id, imageUrl, price, title } = workshop

  const dispatch = useDispatch()
  const [tickets, setTickets] = useState(0)

  const addItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (tickets > 0)
      dispatch(
        cartActions.addItemsToCart({
          id,
          imageUrl,
          title,
          price,
          quantity: tickets,
          totalPrice: price * tickets,
        })
      )
    setTickets(0)
  }

  return (
    <div className={classes['purchase-container']}>
      <h5>Buy Your Ticket</h5>
      <h2>
        {price.toFixed(2).replace('.', ',')}
        <span>EUR</span>
      </h2>
      <form onSubmit={addItem} className={classes['form-container']}>
        <div className={classes['select-container']} onClick={() => setShowDropdown(!showDropdown)}>
          <div className={classes.select}>
            <h6 className={classes.tickets}>{tickets}</h6>
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
                {[...Array(99).fill(1)].map((number, i) => (
                  <div key={number + i} onClick={() => setTickets(number + i)} className={classes.option}>
                    <label>{number + i}</label>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.button whileTap={{ scale: 1.1 }} type="submit">
          Add to Cart
        </motion.button>
      </form>
      <h6>Subtotal: {(tickets * price).toLocaleString('de-DE', { minimumFractionDigits: 2 })}EUR</h6>
    </div>
  )
}

export default BuyTicketForm
