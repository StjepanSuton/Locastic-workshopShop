import { Route, Routes } from 'react-router'
import Header from './components/Header/Header'
import SingleItemPage from './components/SingleItemPage/SingleItemPage'
import Workshop from './components/WorkShopShop/WorkshopStore'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Workshop />} />
        <Route path={'/workshop'} element={<Workshop />} />
        <Route path={'/workshop/:id'} element={<SingleItemPage />} />
      </Routes>
    </>
  )
}

export default App
