import classes from './Icon.module.scss'
function Icon({ category, classPicker }: { category: string; classPicker: string }) {
  return (
    <>
      {category !== 'all' ? (
        <img className={classes[classPicker]} src={require(`../../assets/${category}.svg`)} />
      ) : (
        <span />
      )}
    </>
  )
}

export default Icon
