// src/components/SignInForm/SignInForm.jsx
import styles from '../styles/SigninPage.module.css'

import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../services/authService';
import { useAuth } from '../context/AuthContext';


const SignInForm = ({ }) => {
  const { setUser } = useAuth()
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });


  }

  async function handleSubmit(event) {
    event.preventDefault();

  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate('/dashboard');
    } catch (err) {
      console.log(`Error: ${err}`)
      setError(err?.response?.data?.message);
    }
  };

  useEffect(
    () => {
      document.title = "Sign In | StudyBuddy";
    },
    []
  )

  return (
    <div className={styles.signInContainer}>

      <div className={styles.noContent}>
        <img id="auth-pic" src="../src/assets/circle-logo.png" alt="logo" />
      </div>

      <div className={styles.authContent}>
        <h1 id='signIn-Title'>Sign In</h1>
        <p className='error'>{error}</p>

        <div className={styles.formContainer}>

          <form autoComplete='off' onSubmit={handleSubmit}>
            <div className={styles.formElement}>
              <label htmlFor='email'>Username:</label>
              <input
                className={styles.formInput}
                type='text'
                autoComplete='off'
                id='username'
                value={formData.username}
                name='username'
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formElement}>
              <label htmlFor='password'>Password:</label>
              <input
                className={styles.formInput}

                type='password'
                autoComplete='off'
                id='password'
                value={formData.password}
                name='password'
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.btnContainer}>
              <button className={styles.btn}>Sign In</button>
              <button className={styles.btn} onClick={() => navigate('/')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

