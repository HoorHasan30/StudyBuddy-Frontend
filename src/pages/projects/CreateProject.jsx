import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { createProject } from '../../services/projectService';

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

  return (
    <main>
      <h1>Create Project</h1>

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
          <button>Create</button>
          <button onClick={() => navigate('/projects')}>Cancel</button>
        </div>

      </form>
    </main>
  )
}

export default CreateProject