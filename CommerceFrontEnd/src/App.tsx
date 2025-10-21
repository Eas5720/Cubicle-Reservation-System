import { Route, Routes } from 'react-router-dom'
import './App.css'
import TopNav from './components/TopNav'
import ReservationList from './pages/ReservationList'
import ReservationCreate from './pages/ReservationCreate'
import Login from './pages/Login'
import CubicalCreate from './pages/CubicalCreate'

function App() {

  return (
    <>
      <TopNav/>
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reservationlist" element={<ReservationList />} />
          <Route path="/reservationcreate" element={<ReservationCreate />} />
          <Route path="/cubicalcreate" element={<CubicalCreate />} />
        </Routes>
      </div>

    </>
  )
}

export default App
