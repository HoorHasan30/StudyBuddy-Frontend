import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { deleteCourse, getAllCourses } from '../../services/courseService'
import { useAuth } from '../../context/AuthContext'
import { Flex, Spin } from 'antd'
import styles from '../../styles/course/AllCourses.module.css'

function AllCourses() {

  const navigate = useNavigate()
  const { user } = useAuth()
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
      setError(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCourses()
    document.title = "My Courses | StudyBuddy";
  }, [])


  async function handleDelete(id) {
    try {
      await deleteCourse(id)
      loadCourses()

    } catch (error) {
      setError(error?.response?.data?.message)
    }
  }

  if (loading) return <Flex align='center' gap='medium' justify='center'>
    <Spin size='large' description='Loading...' />
  </Flex>
  if (error) return <p>ERROR: {error}</p>
  if (courses.length === 0) return (

    <main className={styles.noCourses}>
      <img className={styles.image} src="/src/images/8.png" alt="No Course to show" />
      <p>No courses to show yet</p>
      <button className={styles.btn} onClick={() => {
        navigate('/courses/create')
      }}>Create Course</button>
    </main>
  )


  return (
    <main>

      <h1>My Courses</h1>
      <button onClick={() => {
        navigate('/courses/create')
      }}>Create Course</button>


      {courses.map((oneCourse) =>
        <div key={oneCourse._id}>
          <p>{oneCourse.title}</p>

          <button onClick={() => {
            handleDelete(oneCourse._id)
          }}>Delete</button>

          <button onClick={() => {
            navigate(`/courses/${oneCourse._id}`)
          }}>View Detials</button>
        </div>
      )}


    </main>
  )
}

export default AllCourses