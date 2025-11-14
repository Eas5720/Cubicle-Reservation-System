import { Route, Routes } from 'react-router-dom'
import './App.css'
import TopNav from './components/TopNav'
import ReservationList from './pages/ReservationList'
import ReservationCreate from './pages/ReservationCreate'
import Login from './pages/Login'
import CubicleCreate from './pages/CubicleCreate'
import CubicleList from './pages/CubicleList'
import AdminHome from './pages/AdminHome'
import Home from './pages/Home'
import EmployeeList from './pages/EmployeeList'
import NewPage from './pages/NewPage'
import ReservationConfirm from './pages/ReservationConfirm'

function App() {
  return (
    <>
      <TopNav/>
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reservationlist" element={<ReservationList />} />
          <Route path="/reservationcreate" element={<ReservationCreate />} />
          <Route path="reservationcreate/reservationconfirm" element={<ReservationConfirm />} />
          <Route path="/cubiclelist" element={<CubicleList />} />
          <Route path="/cubiclecreate" element={<CubicleCreate />} />
          <Route path="/employeelist" element={<EmployeeList />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/newpage" element={<NewPage />} />
        </Routes>
      </div>

    </>
  )
}

export default App
