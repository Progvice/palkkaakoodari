import './App.css'
import { Routes, Route } from 'react-router-dom'
import { pages } from './pages/pages'
import { Navigate } from 'react-router-dom'
import FourOFour from './pages/General/FourOFour'
import HomePage from './pages/General/Homepage'
import Navbar from './components/layouts/Navbar'
import { ToastContainer } from 'react-toastify'
import LoginPage from './pages/General/Login'
import ProfilePage from './pages/Profile'
import EmployeesPage from './pages/Employees/Employees'
import TeamsPage from './pages/Teams/Teams'
import OrdersPage from './pages/Orders'
import SettingsPage from './pages/Settings'
import SingleEmployeePage from './pages/Employees/SingleEmployee'
import LogoutPage from './pages/General/Logout'
import SingleTeamPage from './pages/Teams/SingleTeam'
import RegisterPage from './pages/General/Register'

function App() {

  return (
    <>
      <ToastContainer/>
      <Navbar/>
      <div className={"min-h-[calc(100vh-80px)] relative top-[80px]"}>
        <div className='flex flex-col w-full pt-[30px] max-w-7xl mx-auto min-h-[calc(100vh-110px)] relative'>
          <Routes>
            <Route path={pages.home} element={<HomePage />} />
            <Route path={pages.login} element={<LoginPage />} />
            <Route path={pages.employees} element={<EmployeesPage/>}/>
            <Route path={`${pages.employees}/:id`} element={<SingleEmployeePage/>}/>
            <Route path={`${pages.teams}/:id`} element={<SingleTeamPage/>}/>
            <Route path={pages.orders} element={<OrdersPage/>}/>
            <Route path={pages.settings} element={<SettingsPage/>}/>
            <Route path={pages.teams} element={<TeamsPage/>}/>
            <Route path={pages.profile} element={<ProfilePage/>}/>
            <Route path={pages.fourOFour} element={<FourOFour/>}/>
            <Route path={pages.logout} element={<LogoutPage/>}/>
            <Route path={pages.register} element={<RegisterPage/>}/>
            <Route path="*" element={<Navigate to={pages.fourOFour} />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
