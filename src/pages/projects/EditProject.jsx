import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

import { updateProjectDetails, getProjectById } from '../../services/projectService'

function EditProject() {

  const navigate = useNavigate();
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
        }
      }
      loadDetails()
    },
    []
  )

  return (
    <div>
      <h1>Edit Project Details</h1>
      <p className='error'>{error}</p>

      <form autoComplete='off' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Project Title:</label>
          <input
            type='text'
            autoComplete='off'
            id='title'
            value={formData.title}
            name='title'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='description'>Project description:</label>
          <textarea
            type='text'
            autoComplete='off'
            id='description'
            value={formData.description}
            name='description'
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor='deadline'>Project Deadline:</label>
          <input
            type='date'
            autoComplete='off'
            id='deadline'
            value={formData.deadline}
            name='deadline'
            onChange={handleChange}
          />
        </div>

        <div>
          <button>Save</button>
          <button onClick={() => navigate(`/projects/${projectId}`)}>Cancel</button>
        </div>

      </form>

    </div>
  )
}

export default EditProject