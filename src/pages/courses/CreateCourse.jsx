import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createCourse } from '../../services/courseService'
import styles from '../../styles/course/CreateCourse.module.css'

function CreateCourse() {

  const [formData, setFormData] = useState({
    title: '',
    description: '',

  })

  const navigate = useNavigate()
  const [error, setError] = useState(false)

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

      const createdCourse = await createCourse(formData)
      navigate('/courses')

    } catch (error) {
      setError(error?.response?.data?.message)

    }
  }

  useEffect(
    () => {
      document.title = "New Course | StudyBuddy";
    },
    []
  )
  return (
    <main className={styles.pageContainer}>

      <h1>Create Course</h1>
      <p className='error'>{error}</p>
<div className={styles.container}>
      <div className={styles.formContainer}>

        <form onSubmit={handleSubmit}>

          <div className={styles.formElement}>
            <label htmlFor="title">Title:</label>
            <input className={styles.formInput} type="text" name='title' id='title' onChange={handleChange} value={formData.title} required />
          </div>

          <div className={styles.formElement}>
            <label htmlFor="description">Description:</label>
            <textarea className={styles.formInput} name="description" id="description" onChange={handleChange} value={formData.description}></textarea>
          </div>

          <div>

          </div>
          <div className={styles.btnContainer}>

            <button className={styles.btn}>Create Course</button>
            <button className={styles.btnCancel} type='button' onClick={() => {
              navigate('/courses')
            }}>Cancel</button>
          </div>

        </form>
      </div>
            <img className={styles.image} src="/src/images/10.png" alt="No Course to show" />
      </div>
  
    </main>
  )
}

export default CreateCourse