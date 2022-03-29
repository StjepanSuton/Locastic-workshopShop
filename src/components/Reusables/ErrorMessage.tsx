import { motion } from 'framer-motion'
import classes from "./ErrorMessage.module.scss"

function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return (
    <motion.p className={classes.error} animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
      {errorMessage}
    </motion.p>
  )
}

export default ErrorMessage
