import Category from './Category/Category'
import Gallery from './Gallery/ShopGallery'
import classes from './WorkshopStore.module.scss'

function WorkshopStore() {
  return (
    <div className={classes['workshop-container']}>
      <Category />
      <Gallery />
    </div>
  )
}

export default WorkshopStore
