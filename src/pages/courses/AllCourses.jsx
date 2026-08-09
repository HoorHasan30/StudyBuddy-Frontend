import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { deleteCourse, getAllCourses } from '../../services/courseService'
import { useAuth } from '../../context/AuthContext'


function AllCourses() {

  const navigate = useNavigate()
  const { user } = useAuth
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  async function loadCourses() {
    try {
      setLoading(true)
      setError(false)

      const res = await getAllCourses()
      setCourses(res)

    } catch (error) {
      setError(error.response.data.message)
    }finally{
      setLoading(false)
    }
   }

   useEffect(()=>{
    loadCourses()
   },[])


   async function handleDelete(id){
    await deleteCourse(id)
    loadCourses()
   }


  return (
    <div>
      <h1>My Courses</h1>
      {courses.map((oneCourse)=>
      <div key={oneCourse._id}>
        <p>{oneCourse.title}</p>

        <button onClick={()=>{
          handleDelete(oneCourse._id)
        }}>Delete</button>

        <button onClick={()=>{
          navigate(`/courses/${oneCourse._id}`)
        }}>View Detials</button>
      </div>
      )}


    </div>
  )
}

export default AllCourses