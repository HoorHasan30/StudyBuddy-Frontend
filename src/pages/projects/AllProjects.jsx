import React, { useState, useEffect } from 'react'
import { getAllProjects, deleteProject } from '../../services/projectService'
import { useNavigate } from 'react-router'
import { Flex, Spin } from 'antd'
import styles from '../../styles/project/AllProjects.module.css'

function AllProjects() {

  const navigate = useNavigate()

  const [error, setError] = useState(false)

  const [loading, setLoading] = useState(true)


  const [projects, setProjects] = useState([])

  async function handleDeleteProject(id) {
    try {
      const response = await deleteProject(id)
      loadProjects()
      setError('')
    }
    catch (err) {
      setError(err.response.data.message)
    }
  }

  async function loadProjects() {
    try {
      setLoading(true)
      setError(false)

      const response = await getAllProjects()
      setProjects(response)
    }
    catch (err) {
      setError(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(
    () => {
      loadProjects()
      document.title = "My Projects | StudyBuddy";
    },
    []
  )

  if (loading) return <Flex align='center' gap='medium' justify='center'>
    <Spin size='large' description='Loading...' />
  </Flex>
  if (error) return <p>ERROR: {error}</p>
  if (projects.length === 0) {
    return (
      <main className={styles.noProjects}>
        <img className={styles.image} src="/src/images/8.png" alt="No Project to show" />
        <p>You Have No Projects Yet!</p>
        <button className={styles.btn} onClick={() => {
          navigate('/projects/create')
        }}>Create Project</button>
      </main>
    )

  }

  return (
    <main>
      <h1>My Projects</h1>
      <p className="error">{error}</p>

      <div className={styles.projectsContainer}>
        <div className={styles.createProject}>
          <button onClick={() => { navigate('/projects/create') }}>+ Create Project</button>
        </div>
        <div className={styles.projectsCardsContainer}>
          {projects.map(p =>
            <div key={p._id} className={styles.projectCard}>

              <div className={styles.cardHeader}>
                <h3 className={styles.projectTitle}>{p.title}</h3>
                <button onClick={() => { handleDeleteProject(p._id) }} className={styles.deleteProject}>🗑</button>
              </div>

              <p>Deadline:  {' '} 
                <span className={styles.projectDeadline}>
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }).format(new Date(p.deadline))}
                </span>
              </p>

              <button  className={styles.viewProjectDetails} onClick={() => { navigate(`/projects/${p._id}`) } }>View Details</button>
            </div>
          )}
        </div>
      </div>

    </main>
  )
}

export default AllProjects