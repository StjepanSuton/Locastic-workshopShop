import classes from './LoadingSpinner.module.scss'

function LoadingSpiner({ selectedClass }: { selectedClass: string }) {
  return <div className={classes[selectedClass]}></div>
}

export default LoadingSpiner
