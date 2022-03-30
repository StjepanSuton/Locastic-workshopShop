import classes from './ThankYouModal.module.scss'
import { motion } from 'framer-motion'
import useWindowDimensions from '../../../hooks/useWindowDimension'
import { useNavigate } from 'react-router'
function ThankYouModal({ setCheckoutModal }: { setCheckoutModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate()
  const { windowWidth } = useWindowDimensions()

  return (
    <div className={classes['main-container']}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        animate={{ y: 0 }}
        initial={{ y: windowWidth > 650 ? -1500 : 1500 }}
        exit={{ y: windowWidth > 650 ? -1500 : 1500 }}
        transition={{ duration: 1, delay: 0.7 }}
        className={classes['thank-you-container']}
      >
        <h2>Thank you!</h2>
        <h6>Go back to the shop and maybe find something else you like</h6>
        <motion.button
          whileTap={{ scale: 1.1 }}
          onClick={() => {
            navigate('/workshop')
            setCheckoutModal(false)
          }}
        >
          Back to Shop
        </motion.button>
      </motion.div>
    </div>
  )
}

export default ThankYouModal
