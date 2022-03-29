import { useEffect, useState } from 'react'
import classes from './ShopGallery.module.scss'
import GalleryItem from '../../Reusables/GalleryItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingSpiner from '../../Reusables/LoadingSpiner'
import { WorkshopData } from '../../Reusables/reusableInterfaces'

function ShopGallery() {
  //States
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [workshops, setWorkshops] = useState<WorkshopData[] | null>(null)
  const [shownWorkshops, setShownWorkShops] = useState(9)
  const selectedCategory = useSelector((state: RootState) => state.categorys)

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
  //Fetching data
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
          json
            .sort((a, b) => {
              return Date.parse(a.date) - Date.parse(b.date)
            })
            .filter((workshop) => {
              if (selectedCategory === DEFAULT_CATEGORY) {
                return workshop
              } else if (selectedCategory === workshop.category) {
                return workshop
              }
            })
        )
      } catch (err) {
        setLoading(false)
        setError('Oops looks like something went wrong try reloading the page ' + err)
      }
    }
    getData()
  }, [selectedCategory])

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
            Displayed:<span>{workshops?.length}</span>
          </h6>
          <motion.div variants={container} initial="hidden" animate="show" className={classes.gallery}>
            <AnimatePresence>
              {workshops?.slice(0, shownWorkshops).map((workshop) => (
                <motion.div layout variants={item} key={workshop.id}>
                  <GalleryItem workshop={workshop} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {workshops && workshops.length >= shownWorkshops ? (
            <h4 className={classes['load-more']} onClick={() => setShownWorkShops((prevState) => prevState + 9)}>
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
