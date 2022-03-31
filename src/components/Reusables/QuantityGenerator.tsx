import classes from './QuantityGenerator.module.scss'

function QuantityGenerator({ method }: { method: (number: number) => void }) {
  return (
    <>
      {[...Array(99).fill(1)].map((number, i) => (
        <div key={number + i} onClick={() => method(number + i)} className={classes.option}>
          <label>{number + i}</label>
        </div>
      ))}
    </>
  )
}

export default QuantityGenerator
