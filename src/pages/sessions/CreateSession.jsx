import React, { useState, useEffect } from 'react'
import { createSessions, getSessions } from '../../services/sessionService'
import { Flex, Spin } from 'antd'

import styles from '../../styles/Pomodoro.module.css'

function CreateSession() {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [time, setTime] = useState(25 * 60) //25 min
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState('Focus') // Focus or Break
  const [cycles, setCycles] = useState(0)

  const [sessionsHistory, setSessionsHistory] = useState([])

  function handleTimerEnd() {
    setIsRunning(false)

    if (mode === 'Focus') {
      setMode('Break')
      setTime(5 * 60)
    }
    else {
      setMode('Focus')
      setTime(25 * 60)
      setCycles(cycles + 1)
    }
  }

  function formatTime() {
    const mins = Math.floor(time / 60).toString().padStart(2, '0')
    const secs = (time % 60).toString().padStart(2, '0')
    return `${mins}:${secs}`
  }

  function handleReset() {
    setIsRunning(false)
    setTime(mode === 'Focus' ? 25 * 60 : 5 * 60)
  }

  async function createSession(body) {
    try {
      await createSessions(body)
      loadSessions()
    }
    catch (err) {
      setError(err.response.data.message)
    }
  }

  async function loadSessions() {
    try {
      setLoading(true)
      setError(false)

      const response = await getSessions()
      setSessionsHistory(response)
      setError('')
    }
    catch (err) {
      setError(err.response.data.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(
    () => { loadSessions() },
    []
  )

  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setTime((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning])

  useEffect(() => {
    if (!isRunning || time > 0) return

    setIsRunning(false)

    if (mode === 'Focus') {
      createSession({ duration: 25 })
      setMode('Break')
      setTime(5 * 60)
    }
    else {
      setMode('Focus')
      setTime(25 * 60)
      setCycles((prev) => prev + 1)
    }
  }, [time, isRunning, mode])

  if (loading) return <Flex align='center' gap='medium' justify='center'>
    <Spin size='large' description='Loading...' />
  </Flex>
  if (error) return <p>ERROR: {error}</p>

  return (
    <main>
      <h1>Pomodoro Timer</h1>
      <p className={styles.error}>{error}</p>

      <div id='pomodoro-container'>
        <div className={styles['pomodoro-cards']}>
          <h2>{mode === 'Focus' ? 'Focus Time' : 'Break Time'}</h2>

          <div id='timer'>
            <img src="../../src/assets/penguin.png" alt="" />
            <h3>{formatTime()}</h3>
          </div>

          <div id='btns'>
            <button onClick={() => { setIsRunning(!isRunning) }}>{isRunning ? 'Pause' : 'Start'}</button>
            <button onClick={() => { handleReset() }}>Reset</button>
          </div>
        </div>

        <div className={styles['pomodoro-cards']} id='history'>

          <h2>My Pomodoro History</h2>
          {sessionsHistory.length === 0 ? 'You have no pomodoro history yet!' :
            <>
              {sessionsHistory.map(s =>
                <div key={s._id} className={styles.session}>
                  <div>
                    <p>{s.duration} Minutes</p>
                  </div>
                  <div>
                    <p>
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }).format(new Date(s.createdAt))}
                    </p>
                  </div>
                </div>
              )}
            </>
          }
        </div>

      </div>
    </main>
  )
}

export default CreateSession