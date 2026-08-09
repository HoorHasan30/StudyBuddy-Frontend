import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getOneCourse } from '../../services/courseService'
import { Flex, Spin } from 'antd'

function CourseDetails() {
  const [course, setCourse] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const {id} = useParams()

  useEffect(()=>{
    async function loadCourseDetails(){
      try {
        setLoading(true)
        setError(false)

        const res = await getOneCourse(id)
        setCourse(res)

      } catch (error) {
        setError(error?.response?.data?.message)

      }finally{
        setLoading(false)
      }
    }
    loadCourseDetails()
  },[])

  if (loading) return <Flex align='center' gap='medium' justify='center'>
        <Spin size='large' description='Loading...' />
    </Flex>
   if(error) return <p>ERROR: {error}</p>
  return (
    <div>
      {course &&(
        <>
        <h1>{course.title} Details</h1>
        <p>{course.description}</p>

        <button onClick={()=>{
          navigate(`/courses/${course._id}/edit`)
        }}>Edit Course Detials</button>

        <button onClick={()=>{
          navigate('/courses')
        }}>Back</button>
        </>
      )}
    </div>
  )
}

export default CourseDetails