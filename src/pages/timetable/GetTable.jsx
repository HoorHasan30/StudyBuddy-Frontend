import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { Flex, Spin } from 'antd'
import { getTimetable, deleteTimetable } from '../../services/timetableService'

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
      if(error.response.status === 404){

      }
      else{

        setError(error?.response?.data?.message)
      }

    } finally {
      setLoading(false)
    }

  }

   async function handleDelete(){
    await deleteTimetable()
    loadTimeTable()
   }

  useEffect(() => {
    loadTimeTable()
  }, [])

  if (loading) return <Flex align='center' gap='medium' justify='center'>
    <Spin size='large' description='Loading...' />
  </Flex>
  if (error) return <p>ERROR: {error}</p>
  if (!timeTable) return <p>No timetable to show yet</p>

  return (
    <div>
      <h1>My TimeTable</h1>
          <button onClick={()=>{
          handleDelete()
        }}>Delete</button>

      <img src={timeTable.tableImage.url} alt="Current Timetable" />

    </div>
  )
}

export default GetTable