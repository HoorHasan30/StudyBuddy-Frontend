import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createProject } from '../../services/projectService';
import styles from '../../styles/project/CreateProject.module.css'

function CreateProject() {

  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: ''
  });

  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await createProject(formData)
      navigate('/projects');
    }
    catch (err) {
      setError(err?.response?.data?.message);
    }
  };

    useEffect(
    () => {
    document.title = "New Project| StudyBuddy";
    },
    []
  )

  return (
    <main className={styles.pageContainer}>
      <h1>Create Project</h1>

      <p className='error'>{error}</p>
<div className={styles.container}>

<div className={styles.formContainer}>

      <form autoComplete='off' onSubmit={handleSubmit}>
        <div className={styles.formElement}>
          <label className={styles.formLabel} htmlFor='title'>Project Title:</label>
          <input
          className={styles.formInput}
            type='text'
            autoComplete='off'
            id='title'
            value={formData.title}
            name='title'
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formElement}>
          <label className={styles.formLabel} htmlFor='description'>Project description:</label>
          <textarea
          className={styles.formInput}
            type='text'
            autoComplete='off'
            id='description'
            value={formData.description}
            name='description'
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className={styles.formElement}>
          <label className={styles.formLabel} htmlFor='deadline'>Project Deadline:</label>
          <input
          className={styles.formInput}
            type='date'
            autoComplete='off'
            id='deadline'
            value={formData.deadline}
            name='deadline'
            onChange={handleChange}
          />
        </div>

        <div className={styles.btnContainer}>
          <button type='button' className={styles.btnCancel} onClick={() => navigate('/projects')}>Cancel</button>
          <button type='submit' className={styles.btn}>Create Project</button>
        </div>

      </form>
      </div>
      </div>
    </main>
  )
}

export default CreateProject