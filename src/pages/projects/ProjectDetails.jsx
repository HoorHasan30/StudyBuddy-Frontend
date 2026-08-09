import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getProjectById } from '../../services/projectService'
import { useAuth } from '../../context/AuthContext'


function ProjectDetails() {

  const navigate = useNavigate()

  const [error, setError] = useState(false)

  const [project, setProject] = useState({})
  const { projectId } = useParams()


  useEffect(
    () => {
      async function loadProjectDetails() {
        try {
          const response = await getProjectById(projectId)
          setProject(response)
        }
        catch (err) {
          setError(err.response.data.message)
        }
      }

      loadProjectDetails()
    },
    []
  )

  // const projectDeadline = new Intl.DateTimeFormat('en-US', {
  //   month: 'short',
  //   day: 'numeric',
  //   year: 'numeric'
  // }).format(new Date(project.deadline))

  const allCollaberators = project.collaberators?.length ? project.collaberators.map(c => c) : []
  const projectTasks = project.tasks?.length ? project.tasks.map(t => t) : []

  return (
    <div>
      <h1>{project.title} Details</h1>
      <p>{project.description}</p>

      <p>Project Deadline: </p>

      <p>Project Collaberators: </p>
      {allCollaberators.length ? (
        <div>
          {allCollaberators.map( u => (
            <div key={`${u._id}`}>
              {u.username}
            </div>
          ))
          }
        </div>
      ) :
        (<p>No Collaborators</p>)
      }

      <p>Project Tasks:</p>
      {projectTasks.length ? (
        <div>
          {projectTasks.map((task) => (
            <div key={`${task._id}`}>
              {task.title}
            </div>
          ))
          }
        </div>
      ) :
        (<p>No Tasks Yet</p>)
      }

      <button onClick={() => { navigate(`/projects/${projectId}/edit`) }}>Edit Project Details</button>
    </div>
  )
}

export default ProjectDetails