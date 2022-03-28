import classes from './CheckoutModal.module.scss'
import closeIcon from '../../../assets/close.svg'
function CheckoutMoadl({ setCheckoutModal }: { setCheckoutModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div onClick={() => setCheckoutModal(false)} id="backdrop" className={classes.backdrop}>
      <div onClick={(e) => e.stopPropagation()} className={classes['modal-container']}>
        <img className={classes.close} src={closeIcon} alt="closeIcon" />
        <h2 className={classes.title}>Checkout</h2>
        <h6 className={classes.instructions}>Please fill in all the required information below</h6>
        <form>
          <div className={classes['input-container']}>
            <label htmlFor="name">First Name</label>
            <input placeholder="Type your first name here" type="text" />
          </div>
          <div className={classes['input-container']}>
            <label htmlFor="name">Last Name</label>
            <input placeholder="Type your last name here" type="text" />
          </div>
          <div className={classes['input-container']}>
            <label htmlFor="email">Email Adress</label>
            <input placeholder="Type your first email adress here" type="email" />
          </div>
          <div className={classes['small-input-container']}>
            <div className={classes['date-input']}>
              <label htmlFor="name">Date of birth</label>
              <input type="text" placeholder="DD.MM.YYYY" />
            </div>
            <div className={classes['date-input']}>
              <label htmlFor="name">Gender</label>
              <input placeholder="Other" type="text" />
            </div>
          </div>
          <div className={classes['input-container']}>
            <label htmlFor="adress">Adress</label>
            <input placeholder="Type your adress here" type="text" />
          </div>
          <div className={classes['input-container']}>
            <label htmlFor="adress">Zip Code</label>
            <input placeholder="eg. 21310" type="text" />
          </div>
          <div className={classes['input-checkbox']}>
            <input type="checkbox" />
            <label htmlFor="adress">I agree</label>
          </div>
          <button>Checkout</button>
        </form>
      </div>
    </div>
  )
}

export default CheckoutMoadl
