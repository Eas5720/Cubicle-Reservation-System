import { Route, Routes } from 'react-router-dom'
import './App.css'
import TopNav from './components/TopNav'
import ReservationList from './pages/ReservationList'
import ReservationCreate from './pages/ReservationCreate'

function App() {

  return (
    <>
      <TopNav/>
      <div className="container mt-4">
        <Routes>
          <Route path="/reservationlist" element={<ReservationList />} />
          <Route path="/reservationcreate" element={<ReservationCreate />} />
        </Routes>
      </div>

    </>
  )
}

export default App
