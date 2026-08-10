import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getProjectById, addCollaberator, removeCollaberator } from '../../services/projectService'
import { useAuth } from '../../context/AuthContext'


function ProjectDetails() {

  const navigate = useNavigate()

  const [error, setError] = useState(false)

  const [formData, setFormData] = useState({
    username: ''
  });

  const [project, setProject] = useState({})
  const { projectId } = useParams()
  const { user } = useAuth()

  async function handleRemoveCollaberator(collaboratorUsername) {
    try {
      await removeCollaberator(projectId, { username: collaboratorUsername })
      await loadProjectDetails()
    }
    catch (err) {
      setError(err.response.data.message)
    }
  }

  async function loadProjectDetails() {
    try {
      const response = await getProjectById(projectId)
      setProject({
        title: response.title ?? '',
        description: response.description ?? '',
        deadline: response.deadline ? new Date(response.deadline).toISOString().slice(0, 10) : '',
        collaberators: response.collaberators ?? [],
        tasks: response.tasks ?? [],
        owner: response.owner ?? ''
      })
    }
    catch (err) {
      setError(err.response.data.message)
    }
  }

  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await addCollaberator(projectId, formData)
      await loadProjectDetails()
      setFormData({username: ''})
    }
    catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  useEffect(
    () => {
      loadProjectDetails()
    },
    []
  )

  const allCollaberators = project.collaberators?.length ? project.collaberators : []
  const projectTasks = project.tasks?.length ? project.tasks : []

  return (
    <div>
      <h1>{project.title} Details</h1>

      <h3>Add Collaberator: </h3>

      <form autoComplete='off' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            autoComplete='off'
            id='username'
            value={formData.username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>
        <button>Add</button>

      </form>

      <hr></hr>
      
      <p>{project.description}</p>

      <p>Project Deadline: {project.deadline}</p>

      <p>Project Collaberators: </p>
      {allCollaberators.length ? (
        <div>
          {allCollaberators.map(u => (
            <div key={`${u._id}`}>
              {u.username}

              {project.owner?._id?.toString() !== user?._id?.toString() ?
                <button onClick={() => { handleRemoveCollaberator(u.username) }}>Remove</button>
                : ''}
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