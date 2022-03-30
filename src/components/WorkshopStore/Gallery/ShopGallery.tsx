import { useEffect, useState } from 'react'
import classes from './ShopGallery.module.scss'
import GalleryItem from '../../Reusables/GalleryItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingSpiner from '../../Reusables/LoadingSpiner'
import { WorkshopData } from '../../Reusables/reusableInterfaces'
import { categoryActions } from '../../../store/categoryStore'
import { uiActions } from '../../../store/uiStore'

function ShopGallery() {
  const dispatch = useDispatch()

  //States
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [workshops, setWorkshops] = useState<WorkshopData[] | null>(null)
  const [filteredWorkshops, setFilteredWorkshops] = useState<WorkshopData[] | null>(null)
  const shownWorkshops = useSelector((state: RootState) => state.categorys.categorysShowing)
  const selectedCategory = useSelector((state: RootState) => state.categorys.selectedCategory)

  const DEFAULT_CATEGORY = 'all'

  //Animation settings
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  }
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
  }

  //Fetching all data with no limits, then filtering in a seprate state so the animations layout works properly
  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:3000/workshops')
        const json: WorkshopData[] = await response.json()
        if (!response.ok) {
          throw Error(JSON.stringify(response.status))
        }
        setLoading(false)
        setWorkshops(
          json.sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date)
          })
        )
      } catch (err) {
        setLoading(false)
        setError('Oops looks like something went wrong :( try reloading the page ' + err)
      }
    }
    getData()
  }, [])

  //Filtering
  useEffect(() => {
    if (workshops) {
      setFilteredWorkshops(
        workshops.filter((workshop) => {
          if (selectedCategory === DEFAULT_CATEGORY) {
            return workshop
          } else if (selectedCategory === workshop.category) {
            return workshop
          }
          return null //Warning appears unless i do this
        })
      )
    }
  }, [workshops, selectedCategory])

  /////////////////////////BONUS//////////////////////////
  const idToScrollTo = useSelector((state: RootState) => state.id)

  useEffect(() => {
    if (workshops)
      setTimeout(() => {
        let element = document.getElementById(idToScrollTo)
        console.log(element)
        element &&
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
          })
        dispatch(uiActions.setScrollTarget(''))
      }, 500)
  }, [workshops])

  const calculateDisplayedWorkshops = () => {
    return filteredWorkshops?.slice(0, shownWorkshops).length
  }

  return (
    <>
      {loading && (
        <div className={classes.loader}>
          <LoadingSpiner />
        </div>
      )}
      {error && <h2 className={classes.error}>{error}</h2>}
      {!loading && !error && (
        <div className={classes['gallery-container']}>
          <h2>Workshops</h2>
          <h6>
            Displayed:<span>{calculateDisplayedWorkshops()}</span>
          </h6>
          <motion.div variants={container} initial="hidden" animate="show" className={classes.gallery}>
            <AnimatePresence>
              {filteredWorkshops?.slice(0, shownWorkshops).map((workshop) => (
                <motion.div id={JSON.stringify(workshop.id)} layout variants={item} key={workshop.id}>
                  <GalleryItem workshop={workshop} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {filteredWorkshops && filteredWorkshops.length >= shownWorkshops ? (
            <h4 className={classes['load-more']} onClick={() => dispatch(categoryActions.shownCategory(9))}>
              Load More
            </h4>
          ) : (
            ''
          )}
        </div>
      )}
    </>
  )
}

export default ShopGallery
