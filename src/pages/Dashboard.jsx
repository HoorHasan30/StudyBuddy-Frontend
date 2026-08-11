import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router'

import { Flex, Spin } from 'antd'

import { getProjectsDeadline, getAllProjects } from '../services/projectService'
import { getAllCourses } from '../services/courseService'
import { getTasksDeadline } from '../services/tasksService'
import { getSessions } from '../services/sessionService'

function Dashboard() {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { user } = useAuth()
  const navigate = useNavigate()

  const [projects, setProjects] = useState()
  const [courses, setCourses] = useState()
  const [sessions, setSessions] = useState()

  const [tasksDeadline, setTasksDeadline] = useState([])
  const [projectsDeadline, setProjectsDeadline] = useState([])


  async function loadData() {
    try {
      setLoading(true)
      setError(false)

      const projectRes = await getAllProjects()
      setProjects(projectRes.length)

      const courseRes = await getAllCourses()
      setCourses(courseRes.length)

      const sessionRes = await getSessions()
      setSessions(sessionRes.length)
    }
    catch (err) {
      setError(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  async function loadDeadlines() {
    try {
      setLoading(true)
      setError(false)

      const projectsDeadlines = await getProjectsDeadline()
      setProjectsDeadline(projectsDeadlines)

      const tasksDeadlines = await getTasksDeadline()
      setTasksDeadline(tasksDeadlines)
    }
    catch (err) {
      setError(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(
    () => {
      loadData()
      loadDeadlines()
    }, []
  )

  if (loading) return <Flex align='center' gap='medium' justify='center'>
    <Spin size='large' description='Loading...' />
  </Flex>
  if (error) return <p>ERROR: {error}</p>
  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <p className="error">{error}</p>

      <p>{projects}</p>
      <h2>Projects</h2>

      <p>{courses}</p>
      <h2>Courses</h2>

      <p>{sessions}</p>
      <h2>Study Sessions</h2>


      <h2>Projects Deadlines</h2>

      {projectsDeadline.length === 0 ? 'You have no upcoming project deadlines' :
        <>
          {projectsDeadline.map(p =>
            <div key={p._id} onClick={() => { navigate(`/projects/${p._id}`) }}>
              <p>{p.title}</p>
              <p>{new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }).format(new Date(p.deadline))}</p>
            </div>
          )}
        </>
      }

      <h2>Tasks Deadlines</h2>

      {tasksDeadline.length === 0 ? 'You have no upcoming task deadlines' :
        <>
          {tasksDeadline.map(t =>
            <div key={t._id} >
              <p>{t.title}</p>
              <p>{new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }).format(new Date(t.deadline))}</p>
            </div>
          )}
        </>
      }
    </div>
  )
}

export default Dashboard