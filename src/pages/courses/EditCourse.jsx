import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getOneCourse, updateCourse } from '../../services/courseService'
import { Flex, Spin } from 'antd'
import styles from '../../styles/course/EditCourse.module.css'

function EditCourse() {

  const [formData, setFormData] = useState({
    title: '',
    description: '',

  })


  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)


  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })

  }

  async function handleSubmit(event) {
    try {
      event.preventDefault()

      const updatedCourse = await updateCourse(id, formData)
      navigate('/courses')

    } catch (error) {
      setError(error?.response?.data?.message)

    }
  }

  useEffect(() => {
    async function loadCourseDetails() {
      try {
        setLoading(true)
        setError(false)

        const res = await getOneCourse(id)
        setFormData(res)

      } catch (error) {
        setError(error?.response?.data?.message)


      } finally {
        setLoading(false)
      }

    }
    loadCourseDetails()

  }, [])

  useEffect(
    () => {
      document.title = "Edit Course | StudyBuddy";
    },
    []
  )

  if (loading) return <Flex align='center' gap='medium' justify='center'>
    <Spin size='large' description='Loading...' />
  </Flex>
  if (error) return <p>ERROR: {error}</p>

  return (
    <main className={styles.pageContainer}>

      <h1>EditCourse</h1>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>

            <div className={styles.formElement}>
              <label className={styles.formLabel} htmlFor="title">Title:</label>
              <input className={styles.formInput} type="text" name='title' id='title' onChange={handleChange} value={formData.title} />
            </div>

            <div className={styles.formElement}>
              <label className={styles.formLabel} htmlFor="description">Description:</label>
              <textarea className={styles.formInput} name="description" id="description" onChange={handleChange} value={formData.description}></textarea>
            </div>

            <div className={styles.btnContainer}>

              <button type='submit' className={styles.btnSave}>Save</button>
              <button  className={styles.btnCancel} type='button' onClick={() => {
                navigate(`/courses/${id}`)
              }}>Cancel</button>
            </div>

          </form>
        </div>
      </div>
    </main>
  )
}

export default EditCourse