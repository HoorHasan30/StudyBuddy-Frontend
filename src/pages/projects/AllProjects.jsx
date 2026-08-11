import React, { useState, useEffect } from 'react'
import { getAllProjects, deleteProject } from '../../services/projectService'
import { useNavigate } from 'react-router'
import { Flex, Spin } from 'antd'


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
    },
    []
  )

  if (loading) return <Flex align='center' gap='medium' justify='center'>
    <Spin size='large' description='Loading...' />
  </Flex>
  if (error) return <p>ERROR: {error}</p>
  if (projects.length === 0) {
    return <p>You Have No Projects Yet!</p>
  }

  return (
    <div>
      <h1>My Projects</h1>
      <p className="error">{error}</p>

      <button onClick={() => { navigate('/projects/create') }}>Create Project</button>

      {projects.map(p =>
        <div key={p._id}>
          <h3>{p.title}</h3>

          <p>{new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }).format(new Date(p.deadline))}</p>

          <button onClick={() => { handleDeleteProject(p._id) }}>Delete</button>
          <button onClick={() => { navigate(`/projects/${p._id}`) }}>View Details</button>
        </div>
      )}

    </div>
  )
}

export default AllProjects