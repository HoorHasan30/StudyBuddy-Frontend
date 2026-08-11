import React from 'react'
import styles from '../styles/Homepage.module.css'

function Homepage() {
  return (
    <div className={styles.homeContainer}>

      <img className={styles.homeLogo} src="\src\images\7.png" alt="Homepage Logo" />

      <button>Sign-Up</button>
      <button>Sign-In</button>
    </div>
  )
}

export default Homepage