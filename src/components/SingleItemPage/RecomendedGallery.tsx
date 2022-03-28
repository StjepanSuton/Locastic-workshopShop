import { useEffect, useState } from 'react'
import GalleryItem from '../Reusables/GalleryItem'
import classes from './RecomendedGallery.module.scss'

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

function RecomendedGallery({ category, id }: { category: string; id: number }) {
  const [loading, setLoading] = useState(true)
  const [workshops, setWorkshops] = useState<WorkshopData[] | null>(null)
  const [workshopsError, setWorksopsError] = useState<string | null>(null)

  useEffect(() => {
    const getWorkshopData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`http://localhost:3000/workshops/`)
        const json: WorkshopData[] = await response.json()
        if (!response.ok) {
          throw Error(JSON.stringify(response.status))
        }
        setLoading(false)
        setWorkshops(
          json
            .filter((workshop) => workshop.category === category)
            .filter((workshop) => workshop.id !== id)
            .slice(0, 3)
        )
      } catch (err) {
        setLoading(false)
        setWorksopsError('Oops looks like something went wrong try reloading the page \n' + err)
      }
    }
    getWorkshopData()
  }, [])

  return (
    <div className={classes['recomended-container']}>
      <div className={classes.placeholder}></div>
      <div className={classes['recomended-pages-container']}>
        <h2>Simiral Workshops</h2>
        <div className={classes['gallery-container']}>
          {workshops?.map((workshop) => (
            <GalleryItem key={workshop.id} workshop={workshop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecomendedGallery
