import React, { useEffect, useState } from 'react'
import classes from './CheckoutModal.module.scss'
import closeIcon from '../../../assets/close.svg'
import useInput from '../../../hooks/use-input'
import { AnimatePresence, motion } from 'framer-motion'
import ErrorMessage from '../../Reusables/ErrorMessage'
import ThankYouModal from './ThankYouModal'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

//Checker Functions
const isNameValid = (value: string) => {
  if (value.trim() !== '' && /^[a-zA-Z]+$/.test(value)) {
    return true
  } else {
    return false
  }
}
const isEmailValid = (value: string) => value.includes('@')
const isAdressValid = (value: string) => value.trim() !== ''
const isZipCodeValid = (value: string) => value.trim().length === 5

function CheckoutModal({ setCheckoutModal }: { setCheckoutModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [showCheckoutModa, setShowCheckoutModal] = useState(true)
  const [showThankYouModal, setShowThankYouModal] = useState(false)
  const cartItems = useSelector((state: RootState) => state.cart)
  const totalCartPrice = useSelector((state: RootState) => state.cart.totalCartPrice)
  //checkFirstName
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(isNameValid)

  const firstNameClasses = firstNameHasError ? 'input-container-invalid' : 'input-container'

  //checkLastName
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(isNameValid)

  const lastNameClasses = lastNameHasError ? 'input-container-invalid' : 'input-container'

  //checkEmail
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmailValid)

  const emailClasses = emailHasError ? 'input-container-invalid' : 'input-container'

  //checkDate this one cant use the useInput costumhook becuase its value cannot be changed
  const [dateValue, setDateValue] = useState<string | null>(null)
  const [dateIsTouched, setDateIsTouched] = useState(false)
  const [dateHasError, setDateHasError] = useState(true)

  const dateValidationHandler = () => {
    setDateIsTouched(true)
    if (dateValue) {
      setDateHasError(false)
    }
  }

  const dateClasses = dateIsTouched && dateHasError ? 'date-input-error' : 'date-input'

  //checkGender this one cant use the useInput costumhook
  const [selectValue, setSelectValue] = useState<string | null>()
  //checkAdress
  const {
    value: adressValue,
    isValid: adressIsValid,
    hasError: adressHasError,
    valueChangeHandler: adressChangeHandler,
    inputBlurHandler: adressBlurHandler,
  } = useInput(isAdressValid)

  const adressClasses = adressHasError ? 'input-container-invalid' : 'input-container'

  //checkZipCode
  const {
    value: zipCodeValue,
    isValid: zipCodeIsValid,
    hasError: zipCodeHasError,
    valueChangeHandler: zipCodeChangeHandler,
    inputBlurHandler: zipCodeBlurHandler,
  } = useInput(isZipCodeValid)

  const zipCodeClasses = zipCodeHasError ? 'input-container-invalid' : 'input-container'

  //chekBox this one cant use the useInput costumhook becuase its value cannot be changed
  const [checkBoxValue, setCheckBoxValue] = useState(false)
  //Form Handleing
  const [formHasError, setFormHasError] = useState<boolean>(false)

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      firstNameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      dateValue &&
      selectValue &&
      adressIsValid &&
      zipCodeIsValid &&
      checkBoxValue
    ) {
      ;(async () => {
        const response = await fetch('http://localhost:3000/orders', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ products: cartItems, totalPrice: totalCartPrice }),
        })
      })()
      e.currentTarget.reset()
      setShowCheckoutModal(false)
      setShowThankYouModal(true)
    } else {
      setFormHasError(true)
    }
  }

  useEffect(() => {
    if (formHasError) {
      const timer = setTimeout(() => {
        setFormHasError(false)
      }, 3500)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [formHasError])

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => setCheckoutModal(false)}
      className={classes.backdrop}
    >
      <AnimatePresence>
        {showCheckoutModa && (
          <div className={classes.modal}>
            <motion.div
              animate={{ y: 0 }}
              initial={{ y: 1000 }}
              exit={{ y: 1000 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={(e) => e.stopPropagation()}
              className={classes['modal-container']}
            >
              <motion.img
                whileTap={{ scale: 1.1 }}
                onClick={() => setCheckoutModal(false)}
                className={classes.close}
                src={closeIcon}
                alt="closeIcon"
              />
              <h2 className={classes.title}>Checkout</h2>
              <h6 className={classes.instructions}>Please fill in all the required information below</h6>
              <form onSubmit={formSubmitHandler}>
                <div className={classes[firstNameClasses]}>
                  <label htmlFor="name">First Name</label>
                  <input
                    value={firstNameValue}
                    onChange={firstNameChangeHandler}
                    onBlur={firstNameBlurHandler}
                    placeholder="Type your first name here"
                    type="text"
                  />
                  <AnimatePresence>
                    {firstNameHasError && (
                      <div className={classes.error}>
                        <ErrorMessage errorMessage="First name cotnatins invalid symbols/is empty" />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
                <div className={classes[lastNameClasses]}>
                  <label htmlFor="name">Last Name</label>
                  <input
                    value={lastNameValue}
                    onChange={lastNameChangeHandler}
                    onBlur={lastNameBlurHandler}
                    placeholder="Type your last name here"
                    type="text"
                  />
                  <AnimatePresence>
                    {lastNameHasError && (
                      <div className={classes.error}>
                        <ErrorMessage errorMessage="Last name cotnatins invalid symbols/is empty" />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
                <div className={classes[emailClasses]}>
                  <label htmlFor="email">Email Adress</label>
                  <input
                    value={emailValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    placeholder="Type your email adress here"
                    type="email"
                  />
                  <AnimatePresence>
                    {emailHasError && (
                      <div className={classes.error}>
                        <ErrorMessage errorMessage="Email must include @" />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
                <div className={classes['small-input-container']}>
                  <div className={classes[dateClasses]}>
                    <label htmlFor="name">Date of birth</label>
                    <input
                      onChange={(e) => setDateValue(e.target.value)}
                      onBlur={dateValidationHandler}
                      type="date"
                      min="1910-01-01"
                      max="2010-12-31"
                    />
                    <AnimatePresence>
                      {dateIsTouched && dateHasError && (
                        <div className={classes['small-error']}>
                          <ErrorMessage errorMessage="Select a date" />
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className={classes['gender-input']}>
                    <label htmlFor="name">Gender</label>
                    <select onChange={(e) => setSelectValue(e.target.value)} placeholder="Other">
                      <option value={'Other'}>Other</option>
                      <option value={'Male'}>Male</option>
                      <option value={'Female'}>Female</option>
                    </select>
                  </div>
                </div>
                <div className={classes[adressClasses]}>
                  <label htmlFor="adress">Adress</label>
                  <input
                    value={adressValue}
                    onChange={adressChangeHandler}
                    onBlur={adressBlurHandler}
                    placeholder="Type your adress here"
                    type="text"
                  />
                  <AnimatePresence>
                    {adressHasError && (
                      <div className={classes.error}>
                        <ErrorMessage errorMessage="Adress must not be empty" />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
                <div className={classes[zipCodeClasses]}>
                  <label htmlFor="adress">Zip Code</label>
                  <input
                    value={zipCodeValue}
                    onChange={zipCodeChangeHandler}
                    onBlur={zipCodeBlurHandler}
                    placeholder="eg. 21310"
                    type="number"
                  />
                  <AnimatePresence>
                    {zipCodeHasError && (
                      <div className={classes.error}>
                        <ErrorMessage errorMessage="Zip code should be exatcly 5 numbers" />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
                <div className={classes['input-checkbox']}>
                  <input onClick={() => setCheckBoxValue(!checkBoxValue)} type="checkbox" />
                  <label htmlFor="adress">I agree</label>
                </div>
                <button type="submit">Checkout</button>
                <AnimatePresence>
                  {formHasError && (
                    <div className={classes['form-error']}>
                      <ErrorMessage errorMessage="Some of the data is invalid please check your data" />
                    </div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>{showThankYouModal && <ThankYouModal />}</AnimatePresence>
    </motion.div>
  )
}

export default CheckoutModal
