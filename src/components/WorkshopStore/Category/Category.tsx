import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useWindowDimensions from '../../../hooks/useWindowDimension'
import { RootState } from '../../../store'
import { categoryActions } from '../../../store/categoryStore'
import Icon from '../../Reusables/Icon'
import downIcon from '../../../assets/bluearrowdown.svg'
import classes from './Category.module.scss'
import { formatFirstLetterToUpperCase } from '../../Reusables/formaters'
import { DEFAULT_CATEGORY } from '../../Reusables/defaultValues'
import { CATEGORY_TYPE, ICON_TYPE } from '../../Reusables/reuasblEnums'
function Category() {
  const { windowWidth } = useWindowDimensions()
  const dispatch = useDispatch()
  //States
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[] | null>(null)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const selectedCategory = useSelector((state: RootState) => state.categorys.selectedCategory)

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
          return [DEFAULT_CATEGORY, ...json.reverse()]
        })
      } catch (err) {
        setError('Oops looks like something went wrong try reloading the page \n' + err)
      }
    }
    getData()
  }, [])

  const dekstopCategorys = () => {
    return categories?.map((category) => (
      <div
        onClick={() => dispatch(categoryActions.selectCategory(category))}
        className={classes.categorys}
        key={category}
      >
        <div className={classes['icon-container']}>
          <Icon
            category={category}
            classPicker={selectedCategory === category ? ICON_TYPE.ACTIVE : ICON_TYPE.INACTIVE}
          />
        </div>
        <h6
          title={formatFirstLetterToUpperCase(category)}
          className={classes[selectedCategory === category ? CATEGORY_TYPE.ACTIVE : CATEGORY_TYPE.INACTIVE]}
        >
          {formatFirstLetterToUpperCase(category)}
        </h6>
      </div>
    ))
  }

  const mobileCategorys = () => {
    return (
      <>
        <div onClick={() => setShowCategoryDropdown(!showCategoryDropdown)} className={classes['arrow-category']}>
          <img src={downIcon} alt="down" />
          <h5>{selectedCategory.toUpperCase().slice(0, 1) + selectedCategory.slice(1, selectedCategory.length)}</h5>
        </div>
        <AnimatePresence>
          {showCategoryDropdown && (
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: -30, opacity: 0 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={classes['category-dropdown-container']}
            >
              {categories?.map((category) => (
                <h6
                  key={category}
                  onClick={() => {
                    dispatch(categoryActions.selectCategory(category))
                    setShowCategoryDropdown(false)
                  }}
                  title={formatFirstLetterToUpperCase(category)}
                >
                  {formatFirstLetterToUpperCase(category)}
                </h6>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <>
      {!error && (
        <div className={classes['category-container']}>
          {windowWidth > 1200 && <h6 className={classes.title}>Filter by category</h6>}
          {windowWidth > 1200 ? dekstopCategorys() : mobileCategorys()}
        </div>
      )}
    </>
  )
}

export default Category
