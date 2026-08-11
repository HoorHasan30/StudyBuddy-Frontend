import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router'

import { Flex, Spin } from 'antd'

import { getProjectsDeadline, getAllProjects } from '../services/projectService'
import { getAllCourses } from '../services/courseService'
import { getTasksDeadline } from '../services/tasksService'
import { getSessions } from '../services/sessionService'

import styles from '../styles/Dashboard.module.css'

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
      document.title = "Dashboard | StudyBuddy";
    }, []
  )

  if (loading) return <Flex align='center' gap='medium' justify='center'>
    <Spin size='large' description='Loading...' />
  </Flex>
  if (error) return <p>ERROR: {error}</p>
  return (
    <main>
      <div id='dashboard-header'>
        <div id='header-text'>
          <h1>Welcome {user.username} !</h1>
          <p>Plan smarter, Study better, & Succeed together</p>
        </div>
        <div id='header-img'>
          <img src="../src/assets/sitting-penguin.png" alt="penguin" />
        </div>
      </div>

      <p className={styles.error}>{error}</p>

      <div id='dashboard-cards-container'>
        <div className={styles['dashboard-cards']}>
          <h2>{projects}</h2>
          <p>Projects</p>
        </div>

        <div className={styles['dashboard-cards']}>
          <h2>{courses}</h2>
          <p>Courses</p>
        </div>

        <div className={styles['dashboard-cards']}>
          <h2>{sessions}</h2>
          <p>Study Sessions</p>
        </div>
      </div>

      <div id='dashboard-deadlines'>

        <div className={styles.deadlines}>
          <h2>Projects Deadlines</h2>

          {projectsDeadline.length === 0 ? 'You have no upcoming project deadlines' :
            <>
              {projectsDeadline.map(p =>
                <div key={p._id} onClick={() => { navigate(`/projects/${p._id}`) }} className={styles['deadline-card']}>
                  <div>
                    <p><span className="point">●</span> {p.title}</p>
                  </div>
                  <div>
                    <p>
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }).format(new Date(p.deadline))}
                    </p>
                  </div>
                </div>
              )}
            </>
          }
        </div>

        <div className={styles.deadlines}>
          <h2>Tasks Deadlines</h2>

          {tasksDeadline.length === 0 ? 'You have no upcoming task deadlines' :
            <>
              {tasksDeadline.map(t =>
                <div key={t._id} className={styles['deadline-card']} id="task-card">
                  <div>
                    <p><span className={styles.point}>●</span> {t.title}</p>
                  </div>
                  <div>
                    <p>{new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }).format(new Date(t.deadline))}</p>
                  </div>
                </div>
              )}
            </>
          }
        </div>
      </div>

    </main>
  )
}

export default Dashboard