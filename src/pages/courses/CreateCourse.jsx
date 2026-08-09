import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createCourse } from '../../services/courseService'

function CreateCourse() {
  
  const [formData, setFormData] = useState({
    title:'',
    description:'',

  })

  const navigate = useNavigate()

  
function handleChange(event) {
  setFormData({ ...formData, [event.target.name]: event.target.value })

}

async function handleSubmit(){
  try {
    event.preventDefault()

    const createdCourse = await createCourse(formData)
    navigate('/courses')
    
  } catch (error) {
    
  }
}
  
  return (
    <div>
        <h1>Create Course</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input type="text" name='title' id='title' onChange={handleChange} value={formData.title}/>

          <label htmlFor="description">Description:</label>
          <input type="textarea" name='description' id='description' onChange={handleChange} value={formData.description}/> 

          <button>Create Course</button>         

        </form>
    </div>
  )
}

export default CreateCourse