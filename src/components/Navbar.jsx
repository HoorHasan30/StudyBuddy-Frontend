import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { logout, user} = useAuth()
  return (

    <nav>
      {user 
      ? 
      (<>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/courses'>My Courses</Link>
      <Link to='/projects'>My Projects</Link>
      <Link to='/timetable'>My Timetable</Link>
      <Link to='/session'>Pomodoro</Link>

      <button onClick={logout}>Sign Out</button>
      </>) : ''}

    </nav>
  )
}

export default Navbar