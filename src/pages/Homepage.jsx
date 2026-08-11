import React, {useEffect} from 'react'
import styles from '../styles/Homepage.module.css'
import { Link } from 'react-router'

function Homepage() {

    useEffect(
    () => {
    document.title = "StudyBuddy";
    },
    []
  )

  return (
    <div className={styles.homeContainer}>

      <img className={styles.homeLogo} src="\src\images\7.png" alt="Homepage Logo" />

      <div className={styles.linkContainer}>
        <Link to={'/sign-up'} className={styles.linkSign}>Sign-Up</Link>
        <Link to={'sign-in'} className={styles.linkSign}>Sign-In</Link>

      </div>
    </div>
  )
}

export default Homepage