import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createCourse } from '../../services/courseService'

function CreateCourse() {
  
  const [formData, setFormData] = useState({
    title:'',
    description:'',

  })

  
  return (
    <div>
        <h1>Create Course</h1>
        <form >
          <label htmlFor="title">Title:</label>
          <input type="text" name='title' id='title' value={}/>

          <label htmlFor="description">Description:</label>
          <input type="textarea" name='description' id='description' value={}/> 

          <button>Create Course</button>         

        </form>
    </div>
  )
}

export default CreateCourse