import { useEffect, useState } from 'react'
import GalleryItem from '../Reusables/GalleryItem'
import { WorkshopData } from '../Reusables/reusableInterfaces'
import classes from './RecomendedGallery.module.scss'

function RecomendedGallery({ category, id }: { category: string; id: number }) {
  const [workshops, setWorkshops] = useState<WorkshopData[] | null>(null)

  useEffect(() => {
    const getWorkshopData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/workshops/`)
        const json: WorkshopData[] = await response.json()
        if (!response.ok) {
          throw Error(JSON.stringify(response.status))
        }

        setWorkshops(
          json
            .filter((workshop) => workshop.category === category)
            .filter((workshop) => workshop.id !== id)
            .slice(0, 3)
        )
      } catch (err) {}
    }
    getWorkshopData()
  }, [category, id])

  return (
    <div className={classes['recomended-container']}>
      <div className={classes.placeholder}></div>
      <div className={classes['recomended-pages-container']}>
        <h2>Simiral Workshops</h2>
        {workshops && workshops?.length > 0 ? (
          <div className={classes['gallery-container']}>
            {workshops?.map((workshop) => (
              <GalleryItem key={workshop.id} workshop={workshop} />
            ))}
          </div>
        ) : (
          <h2>No similar workshops</h2>
        )}
      </div>
    </div>
  )
}

export default RecomendedGallery
