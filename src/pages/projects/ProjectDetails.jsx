import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getProjectById, addCollaberator, removeCollaberator, createProjectTask, deleteProjectTaskById, updateProjectTaskStatus } from '../../services/projectService'
import { useAuth } from '../../context/AuthContext'
import { Flex, Spin } from 'antd'
import styles from '../../styles/project/ProjectDetails.module.css'

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
      document.title = "My Project | StudyBuddy";
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
    <main className={styles.pageContainer}>

      <div className={styles.title}>
        <h1>{project.title} Details</h1>
      </div>

      <div className={styles.headerContainer}>
        <div className={styles.header}>

          <button className={styles.btnBack} onClick={() => { navigate('/projects') }}>Back</button>
          {projectOwnerId === currentUserId && (
            <button className={styles.btnEdit} onClick={() => navigate(`/projects/${projectId}/edit`)}>Edit Project Details</button>
          )}
        </div>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.projectDetails}>
          <p><span className={styles.spanDetails}>Project Description:</span> {project.description}</p>
          <p><span className={styles.spanDetails}>Project Deadline:</span> {project.deadline}</p>
        </div>

        {projectOwnerId === currentUserId && (
          <>
            <div className={styles.addCollabContainer}>
              <di id="collab">
                <h3 className={styles.addCollaberator}>Add Collaberator: </h3>

                <div className={styles.formContainer}>

                  <form autoComplete='off' onSubmit={handleSubmit}>
                    <div className={styles.formElement}>
                      <label className={styles.formLabel} htmlFor='username'>Username:</label>
                      <input
                        className={styles.formInput}
                        type='text'
                        autoComplete='off'
                        id='username'
                        value={formData.username}
                        name='username'
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.btnContainer}>
                      <button className={styles.btnAdd}>Add</button>

                    </div>

                  </form>
                </div>

              </di>


              <div id="collab-list">
                <p className={styles.collaberators}>Project Collaberators: </p>
                {allCollaberators.length ? (
                  <div>
                    {allCollaberators.map(u => (
                      <div className={styles.collabList} key={`${u._id}`}>
                        <span>

                          {u.username}
                        </span>

                        {projectOwnerId === currentUserId && u._id !== currentUserId && (
                          <button className={styles.btnDelete} onClick={() => handleRemoveCollaberator(u.username)}>Remove</button>
                        )}

                      </div>
                    ))
                    }

                  </div>
                ) :
                  (<p>No Collaborators</p>)
                }
              </div>

            </div>


          </>
        )}
      </div>

      <div className={styles.tasksContainer}>
        <div className={styles.taskList}>
          <p>Project Tasks:</p>

          {projectTasks.length ? (
            <div>
              {projectTasks.map((task) => (
                <div className={styles.taskDetails} key={`${task._id}`}>
                  <span className={styles.taskTitle}>
                    {task.title}
                  </span>

                  <span className={styles.taskPriority}>
                    {task.priority}

                  </span>

                  <span className={styles.date}>

                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }).format(new Date(task.deadline))}

                  </span>
                  <span className={styles.status}>

                    {task.status}

                  </span>
                  {task.owner?._id?.toString() === currentUserId && (
                    <>
                      <button className={styles.btnDelete} onClick={() => { handleDeleteTask(task._id) }}>🗑</button>

                      {task.status === 'To Do' ? <button className={styles.btnDone} onClick={() => { handleSetTaskStatus(task._id) }}>✔</button> : ''}
                    </>
                  )}
                </div>
              ))
              }
            </div>
          ) :
            (<p>No Tasks Yet</p>)
          }
        </div>
        <div className={styles.addTaskContainer}>

          <h2 className={styles.addTask}>Add Task:</h2>
          <div className={styles.formContainer}>
            <form autoComplete='off' onSubmit={handleSubmitTask}>
              <div className={styles.formElement}>
                <label className={styles.formLabel} htmlFor='title'>Task Title:</label>
                <input
                  className={styles.formInput}
                  type='text'
                  autoComplete='off'
                  id='title'
                  value={taskFormData.title}
                  name='title'
                  onChange={handleChangeTask}
                  required
                />
              </div>

              <div className={styles.formElement}>
                <label className={styles.formLabel} htmlFor='priority'>Task Priority:</label>
                <select
                  className={styles.formInput}
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

              <div className={styles.formElement}>
                <label className={styles.formLabel} htmlFor='deadline'>Task Deadline:</label>
                <input
                  className={styles.formInput}
                  type='date'
                  autoComplete='off'
                  id='deadline'
                  value={taskFormData.deadline}
                  name='deadline'
                  onChange={handleChangeTask}
                />
              </div>

              <div className={styles.btnContainer}>
                <button className={styles.btnAdd}>Add</button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </main>
  )
}

export default ProjectDetails