import { useState } from 'react'
import { useDispatch } from 'react-redux'
import classes from './BuyTicketForm.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { cartActions } from '../../store/cartStore'
import arrowDownIcon from '../../assets/arrowdown.svg'
import cartIcon from '../../assets/cart.svg'
import useWindowDimensions from '../../hooks/useWindowDimension'
import { formatSubtotalToLocalCurrency, formatToLocalCurrency } from '../Reusables/formaters'
import { WorkshopData } from '../Reusables/reusableInterfaces'
import QuantityGenerator from '../Reusables/QuantityGenerator'
import { DEFAULT_CURRENCY } from '../Reusables/defaultValues'

function BuyTicketForm({ workshop }: { workshop: WorkshopData }) {
  const { windowWidth } = useWindowDimensions()

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
      {windowWidth > 1200 && <h5>Buy Your Ticket</h5>}
      <h2>
        {formatToLocalCurrency(price)}
        <span>{DEFAULT_CURRENCY}</span>
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
                initial={{ y: windowWidth > 1200 ? -40 : 40, opacity: 0 }}
                exit={{ y: windowWidth > 1200 ? -40 : 40, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={classes['options-container']}
              >
                <QuantityGenerator method={setTickets} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.button whileTap={{ scale: 1.1 }} type="submit">
          {windowWidth > 1200 ? (
            'Add to Cart'
          ) : (
            <span>
              Add To <img src={cartIcon} alt="cartIcon" />
            </span>
          )}
        </motion.button>
      </form>
      {windowWidth > 1200 && (
        <h6>
          Subtotal: {formatSubtotalToLocalCurrency(price * tickets)}
          {DEFAULT_CURRENCY}
        </h6>
      )}
    </div>
  )
}

export default BuyTicketForm
