import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createTimeTable } from '../../services/timetableService'

import styles from '../../styles/timetable/CreateTable.module.css'

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

      console.log('after creating', createdTable)
      navigate('/timetable')

    } catch (error) {
      setError(error?.response?.data?.message)

    }
  }

  useEffect(
    () => {
      document.title = "Add Timetable | StudyBuddy";
    },
    []
  )
  return (
    <main>
      <h1>Create TimeTable</h1>
      <div id='uploadPhotoMain'>
        
        <div id="uploadForm">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.photoForm}>

            <label htmlFor="image" className={styles['form-title']}>Upload your TimeTable</label>

            <p className={styles['form-paragraph']}>
              File should be an image
            </p>

            <input type="file" name='image' id='image' id='file-input' onChange={handleChange} accept='image/png, image/jpg, image/jpeg' />

            <button id="addPhoto">Add</button>
          </form>
        </div>

        <div id="viewPhoto">
          <p className={styles['form-title']}>View Photo</p>

          {image && (
            <img src={image} alt="Current TimaeTable" />
          )}
          
        </div>

      </div>
    </main>
  )
}

export default CreateTable