import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getOneCourse, createCourseTask, deleteCourseTask, updateTaskStatus } from '../../services/courseService'
import { Flex, Spin } from 'antd'
import { useAuth } from '../../context/AuthContext'


function CourseDetails() {
  const [course, setCourse] = useState({})
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { id } = useParams()
  const { user } = useAuth()



  const courseTasks = course.tasks?.length ? course.tasks : []
  const courseOwnerId = course.owner?._id?.toString?.() ?? course.owner?.toString?.() ?? ''
  const currentUserId = user?._id?.toString?.() ?? ''


  const [formData, setFormData] = useState({
    title: '',
    deadline: '',
    priority: ''
  })

  function handleChange(event) {
    const { name, type, value, checked } = event.target;


    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }


  async function handleSubmit(event) {
    try {
      event.preventDefault()
      const res = await createCourseTask(id, formData)
      await loadCourseDetails()

      setFormData({
        title: '',
        deadline: '',
        priority: ''
      })

    } catch (error) {
      setError(error?.response?.data?.message);

    }
  }


  async function handleDelete(taskId) {
    try {
      await deleteCourseTask(id, taskId)
      await loadCourseDetails()

    }
    catch (error) {
      console.log('ERROR:', error)

      setError(error.response.data.message)
    }
  }

  async function handleTaskStatus(taskId) {
    try {
      await updateTaskStatus(id, taskId, { status: "Done" })
      await loadCourseDetails()
    }
    catch (error) {
      setError(error.response.data.message)
    }
  }

  async function loadCourseDetails() {
    try {
      setLoading(true)
      setError(false)

      const res = await getOneCourse(id)
      setCourse(res)

    } catch (error) {
      setError(error?.response?.data?.message)

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadCourseDetails()
  }, [])


  if (loading) return <Flex align='center' gap='medium' justify='center'>
    <Spin size='large' description='Loading...' />
  </Flex>
  if (error) return <p>ERROR: {error}</p>
  return (
    <div>
      {course && (
        <>
          {courseOwnerId === currentUserId && (

            <button onClick={() => {
              navigate(`/courses/${course._id}/edit`)
            }}>Edit Course Detials</button>)}

          <button onClick={() => {
            navigate('/courses')
          }}>Back</button>
          <h1>{course.title} Details</h1>
          <p>{course.description}</p>

          <p>Course Tasks:</p>
          <h2>Add task:</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Task Title:</label>
              <input type="text" name='title' id='title' onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="priority">Task Priority:</label>

              <select name="priority" id="priority" onChange={handleChange}>
                <option value="">Select proiority</option>
                <option value="High"> High</option>
                <option value="Moderate">Moderates</option>
                <option value="Low">Low</option>

              </select>

            </div>


            <div>
              <label htmlFor="deadline">Task Deadline:</label>
              <input type="date" name='deadline' id='deadline' onChange={handleChange} />

            </div>

            <button>Add </button>
          </form>

          <hr />


          {courseTasks.map((task) => (
            <div key={task._id}>
              {task.title} - {task.priority} - {new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }).format(new Date(task.deadline))} -- {task.status}

              {courseOwnerId === currentUserId && (
                <>
                  <button onClick={() => { handleDelete(task._id) }}>Delete</button>

                  {task.status === 'To Do' ? <button onClick={() => { handleTaskStatus(task._id) }}>Done</button> : ''}

                </>
              )}
            </div>
          ))}

        </>

      )}
    </div>
  )
}

export default CourseDetails