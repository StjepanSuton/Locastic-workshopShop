import { Navigate, Route, Routes } from 'react-router'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import SingleItemPage from './components/SingleItemPage/SingleItemPage'
import WorkshopStore from './components/WorkshopStore/WorkshopStore'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={'/workshop'} element={<WorkshopStore />} />
        <Route path={'/workshop/:id'} element={<SingleItemPage />} />
        <Route path="*" element={<Navigate to="/workshop" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
