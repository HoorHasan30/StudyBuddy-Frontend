import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createCourse } from '../../services/courseService'

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

  return (
    <div>

      <h1>Create Course</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" name='title' id='title' onChange={handleChange} value={formData.title} required/>

        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" onChange={handleChange} value={formData.description}></textarea>

        <button>Create Course</button>
        <button type='button' onClick={() => {
          navigate('/courses')
        }}>Back</button>

      </form>
    </div>
  )
}

export default CreateCourse