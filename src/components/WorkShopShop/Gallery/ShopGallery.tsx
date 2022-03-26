import { useEffect, useState } from 'react'
import classes from './ShopGallery.module.scss'
import GalleryItem from './GalleryItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { AnimatePresence, motion } from 'framer-motion'

interface WorkshopData {
  category: string
  date: string
  desc: string
  id: number
  imageUrl: string
  price: number
  title: string
  userId: number
}

function ShopGallery() {
  //States
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [workshops, setWorkshops] = useState<WorkshopData[] | null>(null)
  const [shownWorkshops, setShownWorkShops] = useState(9)
  const selectedCategory = useSelector((state: RootState) => state.categorys)
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
        const response = await fetch('http://localhost:3000/workshops', {})
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
              if (selectedCategory === 'all') return workshop
              else if (selectedCategory === workshop.category) return workshop
            })
        )
      } catch (err) {
        setLoading(false)
        setError('Oops looks like something went wrong try reloading the page \n' + err)
      }
    }
    getData()
  }, [selectedCategory])

  return (
    <div className={classes['gallery-container']}>
      <h2>Workshops</h2>
      <h6>
        Displayed:<span>{workshops?.length}</span>
      </h6>
      {loading === true ? (
        <p>Loading...</p>
      ) : (
        !error && (
          <motion.div variants={container} initial="hidden" animate="show" className={classes.gallery}>
            <AnimatePresence>
              {workshops?.slice(0, shownWorkshops).map((workshop) => (
                <motion.div layout variants={item} key={workshop.id}>
                  <GalleryItem workshop={workshop} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )
      )}
      {error && <p>{error}</p>}
      {workshops && workshops.length >= shownWorkshops ? (
        <h4 onClick={() => setShownWorkShops((prevState) => prevState + 9)}>Load More</h4>
      ) : (
        ''
      )}
    </div>
  )
}

export default ShopGallery