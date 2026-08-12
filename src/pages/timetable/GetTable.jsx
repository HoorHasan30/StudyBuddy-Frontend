import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { Flex, Spin } from 'antd'
import { getTimetable, deleteTimetable } from '../../services/timetableService'
import styles from '../../styles/timetable/GetTable.module.css'

function GetTable() {

  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [timeTable, setTimeTable] = useState(null)


  async function loadTimeTable() {
    try {
      setLoading(true)
      setError(false)

      const res = await getTimetable()
      setTimeTable(res)

    } catch (error) {
      if (error?.response?.status === 404) {

      }
      else {

        setError(error?.response?.data?.message)
      }

    } finally {
      setLoading(false)
    }

  }

  async function handleDelete() {
    await deleteTimetable()
    loadTimeTable()

    setTimeTable(null)
  }

  useEffect(() => {
    loadTimeTable()
    document.title = "My Timetable | StudyBuddy";
  }, [])

  if (loading) return <Flex align='center' gap='medium' justify='center'>
    <Spin size='large' description='Loading...' />
  </Flex>
  if (error) return <p>ERROR: {error}</p>
  if (!timeTable) return (
    <main className={styles.noTimeTable}>
      <img className={styles.image} src="/src/images/8.png" alt="No Course to show" />
      <p>No timetable to show yet</p>
      <button className={styles.btn} onClick={() => {
        navigate('/timetable/create')
      }}>Add TimeTable</button>
    </main>

  )

  return (
    <main>
      <h1>My TimeTable</h1>

      <div className={styles.viewtable}>
        <div id='delete-photo'>
          <button onClick={() => {handleDelete()}}>🗑</button>
        </div>
        
        <img src={timeTable.tableImage.url} alt="Current Timetable" />
      </div>
    
    </main>
  )
}

export default GetTable