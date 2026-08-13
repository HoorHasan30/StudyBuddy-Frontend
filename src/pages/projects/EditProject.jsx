import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Flex, Spin } from 'antd'
import { updateProjectDetails, getProjectById } from '../../services/projectService'
import styles from '../../styles/project/EditProject.module.css'

function EditProject() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: ''
  });

  const { projectId } = useParams()

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
      const response = await updateProjectDetails(projectId, formData)
      navigate('/projects');
    }
    catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  useEffect(
    () => {
      async function loadDetails() {
        try {
          setLoading(true)
          setError(false)

          const response = await getProjectById(projectId)
          setFormData(
            {
              title: response.title ?? '',
              description: response.description ?? '',
              deadline: response.deadline ? new Date(response.deadline).toISOString().slice(0, 10) : ''
            }
          )
        }
        catch (err) {
          setError(err?.response?.data?.message);
        } finally {
          setLoading(false)
        }
      }
      loadDetails()
    },
    []
  )

  useEffect(
    () => {
      document.title = "Edit Project | StudyBuddy";
    },
    []
  )

  if (loading) return <Flex align='center' gap='medium' justify='center'>
    <Spin size='large' description='Loading...' />
  </Flex>
  if (error) return <p>ERROR: {error}</p>

  return (
    <main className={styles.pageContainer}>
      <h1>Edit Project Details</h1>
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
              <button className={styles.btnSave}>Save</button>
              <button className={styles.btnCancel} onClick={() => navigate(`/projects/${projectId}`)}>Cancel</button>
            </div>

          </form>
        </div>
      </div>
    </main>
  )
}

export default EditProject