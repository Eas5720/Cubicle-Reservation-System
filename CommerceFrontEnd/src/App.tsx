import { Route, Routes } from 'react-router-dom'
import './App.css'
import TopNav from './components/TopNav'
import ReservationList from './testpages/ReservationList'
import ReservationCreate from './pages/ReservationCreate'
import Login from './pages/Login'
import CubicleCreate from './testpages/CubicleCreate'
import CubicleList from './testpages/CubicleList'
import AdminHome from './pages/AdminHome'
import Home from './pages/Home'
import EmployeeList from './testpages/EmployeeList'
import ReservationConfirm from './pages/ReservationConfirm'
import EmployeeViewReservations from './pages/EmployeeViewReservations'

function App() {
  return (
    <>
      <TopNav/>
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reservationlist" element={<ReservationList />} />
          <Route path="/employeeviewreservations" element={<EmployeeViewReservations />} />
          <Route path="/reservationcreate" element={<ReservationCreate />} />
          <Route path="reservationcreate/reservationconfirm" element={<ReservationConfirm />} />
          <Route path="/cubiclelist" element={<CubicleList />} />
          <Route path="/cubiclecreate" element={<CubicleCreate />} />
          <Route path="/employeelist" element={<EmployeeList />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>

    </>
  )
}

export default App
