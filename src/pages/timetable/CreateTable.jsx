import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createTimeTable } from '../../services/timetableService'


function CreateTable() {


  const [image, setImage] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  function handleChange(event) {

    const file = event.target.files[0]
    previewFile(file)
    setSelectedFile(file)
    
  }

  const previewFile = (file) => {

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setImage(reader.result)
    }
  }


  async function handleSubmit(event) {
    try {
      event.preventDefault()

      const formData = new FormData()
      formData.append('image', selectedFile)
      const createdTable = await createTimeTable(formData)

      
      navigate('/timetable')

    } catch (error) {
      setError(error?.response?.data?.message)

    }
  }

  return (
    <div>
      <h1>Create TimeTable</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <label htmlFor="image">Upload your TimeTable:</label>
        <input type="file" name='image' id='image' onChange={handleChange} accept='image/png, image/jpg, image/jpeg'/>

        <button>Add TimeTable</button>
      </form>

      {image && (
        <img src={image} alt="Current TimaeTable" />
      )}
    </div>
  )
}

export default CreateTable