import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { selectCategory } from '../../../store/categoryStore'
import Icon from '../../Reusables/Icon'
import LoadingSpiner from '../../Reusables/LoadingSpiner'
import classes from './Category.module.scss'
function Category() {
  //States
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[] | null>(null)
  const dispatch = useDispatch()
  const selectedCategory = useSelector((state: RootState) => state.categorys)

  //Fetching data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:3000/categories')
        const json: string[] = await response.json()
        if (!response.ok) {
          throw Error(JSON.stringify(response.status))
        }
        setCategories(() => {
          return ['all', ...json.reverse()]
        })
      } catch (err) {
        setError('Oops looks like something went wrong try reloading the page \n' + err)
      }
    }
    getData()
  }, [])

  return (
    <>
      {!error && (
        <div className={classes['category-container']}>
          <h6 className={classes.title}>Filter by category</h6>
          {categories?.map((category, i) => (
            <div onClick={() => dispatch(selectCategory(category))} className={classes.categorys} key={i}>
              <div className={classes['icon-container']}>
                <Icon
                  category={category}
                  classPicker={selectedCategory === category ? 'icon-active' : 'icon-inactive'}
                />
              </div>
              <h6
                title={category.toUpperCase().slice(0, 1) + category.toLowerCase().slice(1, category.length)}
                className={classes[selectedCategory === category ? 'category-title-active' : 'category-title']}
              >
                {category.toUpperCase().slice(0, 1) + category.slice(1, category.length)}
              </h6>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Category
