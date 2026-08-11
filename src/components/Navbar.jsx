import { Link, NavLink } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { logout, user } = useAuth()
  return (

    <nav>
      {user
        ?
        (<>
          <div id='nav-up'>
            <img src="src/assets/circle-logo.png" alt="logo" />
            <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
            <NavLink to='/courses' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> My Courses</NavLink>
            <NavLink to='/projects' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>My Projects</NavLink>
            <NavLink to='/timetable' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>My Timetable</NavLink>
            <NavLink to='/sessions' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Pomodoro</NavLink>
          </div>

          <div id="nav-down">
            <button onClick={logout}  id='sign-out-btn'>➜] Sign Out</button>
          </div>

        </>) : ''}

    </nav>
  )
}

export default Navbar