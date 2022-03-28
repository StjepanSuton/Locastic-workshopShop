import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import classes from './SingleItemPage.module.scss'
import backIcon from '../../assets/back.svg'
import { motion } from 'framer-motion'
import SingleWorkshop from './SingleWorkshop'
import RecomendedGallery from './RecomendedGallery'
import LoadingSpiner from '../Reusables/LoadingSpiner'

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

interface UserData {
  email: string
  id: number
  name: string
  password: string
}

function SingleItemPage() {
  const [workshop, setWorkshop] = useState<WorkshopData | null>(null)
  const [user, setUser] = useState<UserData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const getWorkshopData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`http://localhost:3000/workshops/${id}`)
        const json: WorkshopData = await response.json()
        if (!response.ok) {
          throw Error(JSON.stringify(response.status))
        }
        setLoading(false)
        setWorkshop(json)
      } catch (err) {
        setLoading(false)
        setError('Oops looks like something went wrong try reloading the page \n' + err)
      }
    }
    getWorkshopData()
  }, [])
  useEffect(() => {
    if (workshop) {
      const getUserData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/users/${workshop.userId}`)
          const json: UserData = await response.json()
          if (!response.ok) {
            throw Error(JSON.stringify(response.status))
          }
          setUser(json)
        } catch (err) {
          setError('Oops looks like something went wrong try reloading the page \n' + err)
        }
      }
      getUserData()
    }
  }, [workshop])

  return (
    <>
      {loading && (
        <div className={classes.loader}>
          <LoadingSpiner />
        </div>
      )}
      {!loading && error && <h2 className={classes.error}>{error}</h2>}
      {!loading && !error && (
        <div>
          <div className={classes['page-container']}>
            <div onClick={() => navigate('/workshop')} className={classes['side-page-container']}>
              <motion.img src={backIcon} alt="back" />
              <h6>Back</h6>
            </div>
            {workshop && <SingleWorkshop userName={user?.name} workshop={workshop} />}
          </div>
          {workshop && <RecomendedGallery id={workshop.id} category={workshop.category} />}
        </div>
      )}
    </>
  )
}

export default SingleItemPage
