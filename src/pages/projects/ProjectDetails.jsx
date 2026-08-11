import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getProjectById, addCollaberator, removeCollaberator, createProjectTask, deleteProjectTaskById, updateProjectTaskStatus } from '../../services/projectService'
import { useAuth } from '../../context/AuthContext'
import { Flex, Spin } from 'antd'


function ProjectDetails() {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(false)

  const [formData, setFormData] = useState({
    username: ''
  });

  const [taskFormData, setTaskFormData] = useState({
    title: '',
    deadline: '',
    priority: ''
  })

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

  async function handleDeleteTask(id) {
    try {
      await deleteProjectTaskById(projectId, id)
      await loadProjectDetails()

    }
    catch (err) {
      setError(err.response.data.message)
    }
  }

  async function handleSetTaskStatus(taskId) {
    try {
      await updateProjectTaskStatus(projectId, taskId, { status: "Done" })
      await loadProjectDetails()
    }
    catch (err) {
      setError(err.response.data.message)
    }
  }

  async function loadProjectDetails() {
    try {
      setLoading(true)
      setError(false)

      const response = await getProjectById(projectId)
      setProject({
        title: response.title ?? '',
        description: response.description ?? '',
        deadline: response.deadline ?
          new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }).format(new Date(response.deadline)) : '',
        collaberators: response.collaberators ?? [],
        tasks: response.tasks ?? [],
        owner: response.owner ?? ''
      })
    }
    catch (err) {
      setError(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleChangeTask(event) {
    const { name, type, value, checked } = event.target;

    setTaskFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await addCollaberator(projectId, formData)
      await loadProjectDetails()
      setFormData({ username: '' })
    }
    catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  async function handleSubmitTask(event) {
    try {
      const response = await createProjectTask(projectId, taskFormData)
      await loadProjectDetails()
      setTaskFormData({
        title: '',
        deadline: '',
        priority: ''
      })
    }
    catch (err) {
      setError(err?.response?.data?.message);
    }
  }

  useEffect(
    () => {
      loadProjectDetails()
    },
    []
  )

  const allCollaberators = project.collaberators?.length ? project.collaberators : []
  const projectTasks = project.tasks?.length ? project.tasks : []

  const currentUserId = user?._id?.toString?.() ?? ''
  const projectOwnerId = project.owner?._id?.toString?.() ?? project.owner?.toString?.() ?? ''

  if (loading) return <Flex align='center' gap='medium' justify='center'>
    <Spin size='large' description='Loading...' />
  </Flex>
  if (error) return <p>ERROR: {error}</p>

  return (
    <main>
      <button onClick={() => { navigate('/projects') }}>Back</button>

      <h1>{project.title} Details</h1>

      {projectOwnerId === currentUserId && (
        <button onClick={() => navigate(`/projects/${projectId}/edit`)}>Edit Project Details</button>
      )}

      {projectOwnerId === currentUserId && (
        <>
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
        </>
      )}

      <p>{project.description}</p>

      <p>Project Deadline: {project.deadline}</p>

      <p>Project Collaberators: </p>
      {allCollaberators.length ? (
        <div>
          {allCollaberators.map(u => (
            <div key={`${u._id}`}>
              {u.username}

              {projectOwnerId === currentUserId && u._id !== currentUserId && (
                <button onClick={() => handleRemoveCollaberator(u.username)}>Remove</button>
              )}

            </div>
          ))
          }
        </div>
      ) :
        (<p>No Collaborators</p>)
      }

      <p>Project Tasks:</p>
      <h2>Add Task:</h2>

      <form autoComplete='off' onSubmit={handleSubmitTask}>
        <div>
          <label htmlFor='title'>Task Title:</label>
          <input
            type='text'
            autoComplete='off'
            id='title'
            value={taskFormData.title}
            name='title'
            onChange={handleChangeTask}
            required
          />
        </div>

        <div>
          <label htmlFor='priority'>Task Priority:</label>
          <select
            id='priority'
            name='priority'
            value={taskFormData.priority}
            onChange={handleChangeTask}
            required
          >
            <option value=''>Select priority</option>
            <option value='High'>High</option>
            <option value='Moderate'>Moderate</option>
            <option value='Low'>Low</option>
          </select>
        </div>

        <div>
          <label htmlFor='deadline'>Task Deadline:</label>
          <input
            type='date'
            autoComplete='off'
            id='deadline'
            value={taskFormData.deadline}
            name='deadline'
            onChange={handleChangeTask}
          />
        </div>

        <div>
          <button>Add</button>
        </div>

      </form>

      <hr></hr>

      {projectTasks.length ? (
        <div>
          {projectTasks.map((task) => (
            <div key={`${task._id}`}>
              {task.title} - {task.priority} - {new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }).format(new Date(task.deadline))} -- {task.status}

              {task.owner?._id?.toString() === currentUserId && (
                <>
                  <button onClick={() => { handleDeleteTask(task._id) }}>Delete</button>

                  {task.status === 'To Do' ? <button onClick={() => { handleSetTaskStatus(task._id) }}>Done</button> : ''}
                </>
              )}
            </div>
          ))
          }
        </div>
      ) :
        (<p>No Tasks Yet</p>)
      }

    </main>
  )
}

export default ProjectDetails