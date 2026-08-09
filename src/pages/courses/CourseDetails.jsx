import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getOneCourse } from '../../services/courseService'

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
        setError(error.response.data.message)

      }finally{
        setLoading(false)
      }
    }
    loadCourseDetails()
  },[])

  return (
    <div>
      {course &&(
        <>
        <h1>{course.title} Details</h1>
        <p>{course.description}</p>

        <button onClick={()=>{
          navigate(`/courses/${course._id}/edit`)
        }}>Edit Course Detials</button>
        </>
      )}
    </div>
  )
}

export default CourseDetails