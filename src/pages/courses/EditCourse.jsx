import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getOneCourse, updateCourse } from '../../services/courseService'
import { Flex, Spin } from 'antd'

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
   if(error) return <p>ERROR: {error}</p>

  return (
    <main>
      <h1>EditCourse</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" name='title' id='title' onChange={handleChange} value={formData.title} />

        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" onChange={handleChange} value={formData.description}></textarea>

        <button>Save</button>
        <button type='button' onClick={()=>{
          navigate(`/courses/${id}`)
        }}>Cancel</button>

      </form>
    </main>
  )
}

export default EditCourse