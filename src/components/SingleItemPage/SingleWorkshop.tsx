import Icon from '../Reusables/Icon'
import dateIcon from '../../assets/date.svg'
import clockIcon from '../../assets/clock.svg'
import classes from './SingleWorkshop.module.scss'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/cartStore'
import BuyTicketForm from './BuyTicketForm'

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
interface CartItem {
  id: number
  imageUrl: string
  title: string
  price: number
  quantity: number
  totalPrice: number
}

function SingleWorkshop({ workshop, userName }: { workshop: WorkshopData; userName: string | undefined }) {
  const { category, date, desc, imageUrl, title } = workshop
  const day =
    new Date(date).toLocaleString('en-us', { weekday: 'long' }).slice(0, 3) +
    ' ' +
    new Date(date).toLocaleDateString('de-DE').replaceAll('/', '.') +
    '.'

  return (
    <div className={classes['workshop-container']}>
      <img className={classes.banner} src={imageUrl} alt="title" />
      <div className={classes['form-description-container']}>
        <div className={classes['workshop-description-container']}>
          <div className={classes['time-info']}>
            <div className={classes['category-icon-container']}>
              <Icon category={category} classPicker={'icon-shop'} />
            </div>
            <img className={classes['time-icon']} loading="lazy" src={dateIcon} alt="date" />
            <h6>{day}</h6>
            <img className={classes['time-icon']} loading="lazy" src={clockIcon} alt="date" />
            <h6>{new Date(date).toLocaleTimeString('de-DE').slice(0, 5).replaceAll('/', ':')}h</h6>
          </div>
          <h1>{title}</h1>
          {userName && (
            <h4>
              <span>WITH</span>
              {userName}
            </h4>
          )}
          <p>{desc}</p>
        </div>
        <BuyTicketForm workshop={workshop} />
      </div>
    </div>
  )
}

export default SingleWorkshop
