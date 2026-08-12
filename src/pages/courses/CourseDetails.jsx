import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getOneCourse, createCourseTask, deleteCourseTask, updateTaskStatus } from '../../services/courseService'
import { Flex, Spin } from 'antd'
import { useAuth } from '../../context/AuthContext'
import styles from '../../styles/course/CourseDetails.module.css'

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
    document.title = "My Course | StudyBuddy";
  }, [])


  if (loading) return <Flex align='center' gap='medium' justify='center'>
    <Spin size='large' description='Loading...' />
  </Flex>
  if (error) return <p>ERROR: {error}</p>
  return (
    <main className={styles.pageContainer}>
      {course && (
        <>
          <div className={styles.btnBack}>
            <button onClick={() => {
              navigate('/courses')
            }}>Back</button>
          </div>

          <h1>{course.title} Details</h1>
          <div className={styles.courseDetails}>

            <p>{course.description}</p>
            {courseOwnerId === currentUserId && (

              <button className={styles.btn} onClick={() => {
                navigate(`/courses/${course._id}/edit`)
              }}>Edit Course Detials</button>
            )}

          </div>

          <div className={styles.taskList}>
            <p>Course Tasks:</p>

            {courseTasks.map((task) => (
              <div className={styles.taskDetails} key={`${task._id}`}>
                <span className={styles.taskTitle}>
                  {task.title}
                </span>

                <span className={styles.taskPriority}>
                  {task.priority}
                </span>

                <span>
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }).format(new Date(task.deadline))}

                </span>
                <span>
                  {task.status}
                </span>

                {courseOwnerId === currentUserId && (
                  <>
                    <button className={styles.btnDelete} onClick={() => { handleDelete(task._id) }}>🗑</button>

                    {task.status === 'To Do' ? <button className={styles.btnDone} onClick={() => { handleTaskStatus(task._id) }}>☑</button> : ''}

                  </>
                )}
              </div>
            ))}
          </div>

          <div>
          </div>

          <div className={styles.addTaskContainer}>

            <h2>Add task:</h2>
            <div className={styles.formContainer}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formElement}>
                  <label className={styles.formLabel} htmlFor="title">Task Title:</label>
                  <input className={styles.formInput} type='text' autoComplete='off' name='title' id='title' onChange={handleChange} />
                </div>

                <div className={styles.formElement}>
                  <label className={styles.formLabel} htmlFor="priority">Task Priority:</label>

                  <select className={styles.formInput} name="priority" id="priority" onChange={handleChange}>
                    <option value="">Select proiority</option>
                    <option value="High"> High</option>
                    <option value="Moderate">Moderates</option>
                    <option value="Low">Low</option>

                  </select>

                </div>


                <div className={styles.formElement}>
                  <label className={styles.formLabel} htmlFor="deadline">Task Deadline:</label>
                  <input className={styles.formInput} type='date' autoComplete='off' name='deadline' id='deadline' onChange={handleChange} />

                </div>
                <div className={styles.btnContainer}>

                  <button className={styles.btn}>Add </button>
                </div>
              </form>
            </div>
          </div>





        </>

      )}
    </main>
  )
}

export default CourseDetails