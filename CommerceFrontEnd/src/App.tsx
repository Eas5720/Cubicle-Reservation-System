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
import { AuthProvider } from './context/AuthContext'
import ConfirmLogin from './components/ConfirmLogin'

function App() {
  return (
    <AuthProvider>
      <TopNav/>
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={
            <ConfirmLogin nonAdminOnly>
              <Home />
            </ConfirmLogin>
          } />
          <Route path="/reservationcreate" element={
            <ConfirmLogin nonAdminOnly>
              <ReservationCreate />
            </ConfirmLogin>
          } />
          <Route path="reservationcreate/reservationconfirm" element={
            <ConfirmLogin nonAdminOnly>
              <ReservationConfirm />
            </ConfirmLogin>
          } />
          <Route path="/employeeviewreservations" element={
            <ConfirmLogin nonAdminOnly>
            <EmployeeViewReservations />
            </ConfirmLogin>
          } />

          <Route path="/adminhome" element={
            <ConfirmLogin adminOnly>
              <AdminHome />
            </ConfirmLogin>
          } />
          
          <Route path="/cubiclelist" element={<CubicleList />} />
          <Route path="/cubiclecreate" element={<CubicleCreate />} />
          <Route path="/employeelist" element={<EmployeeList />} />
          <Route path="/reservationlist" element={<ReservationList />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
