import Icon from '../Reusables/Icon'
import dateIcon from '../../assets/date.svg'
import clockIcon from '../../assets/clock.svg'
import classes from './SingleWorkshop.module.scss'
import BuyTicketForm from './BuyTicketForm'
import useWindowDimensions from '../../hooks/useWindowDimension'
import { formatToLocalDay, formatToLocalTime } from '../Reusables/formaters'
import { WorkshopData } from '../Reusables/reusableInterfaces'


function SingleWorkshop({ workshop, userName }: { workshop: WorkshopData; userName: string | undefined }) {
  const { windowWidth } = useWindowDimensions()

  const { category, date, desc, imageUrl, title } = workshop

  return (
    <div className={classes['workshop-container']}>
      <div className={classes['banner-container']}>
        <img className={classes.banner} src={imageUrl} alt="title" />
        {windowWidth <= 1200 && (
          <div className={classes['category-icon-container']}>
            <Icon category={category} classPicker={'icon-shop'} />
          </div>
        )}
      </div>
      <div className={classes['form-description-container']}>
        <div className={classes['workshop-description-container']}>
          <div className={classes['time-info']}>
            {windowWidth > 1200 && (
              <div className={classes['category-icon-container']}>
                <Icon category={category} classPicker={'icon-shop'} />
              </div>
            )}
            <img className={classes['time-icon']} loading="lazy" src={dateIcon} alt="date" />
            <h6>{formatToLocalDay(date)}</h6>
            <img className={classes['time-icon']} loading="lazy" src={clockIcon} alt="date" />
            <h6>{formatToLocalTime(date)}h</h6>
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
