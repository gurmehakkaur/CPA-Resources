import React, { useState } from 'react';

function AddResourceForm({ onResourceAdded }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [courseId, setCourseId] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 

  const defaultImageUrl = 'https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/50/2024/04/ef5d219e-ff22-4b57-ae7b-1bd363969294.jpg';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newResource = {
      title,
      url,
      imageUrl: imageUrl || defaultImageUrl,
      courseId: parseInt(courseId),
    };

    try {
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResource),
      });

      if (response.ok) {
        const addedResource = await response.json();
        onResourceAdded(addedResource);
        setTitle('');
        setUrl('');
        setImageUrl('');
        setCourseId('');
        setSuccessMessage('Resource added successfully!'); 
        setTimeout(() => setSuccessMessage(''), 3000); 
      } else {
        console.error('Failed to add resource');
        setSuccessMessage('Failed to add resource. Please try again.'); 
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('Error occurred. Please try again.'); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add New Resource</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength="40"
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>URL:</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>Image URL (Optional):</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>Course (1-OOP, 2-DBS, 3-WEB):</label>
        <input
          type="number"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          min="1"
          max="3"
          required
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-button">Add Resource</button>
      {successMessage && <p className="success-message">{successMessage}</p>} 
    </form>
  );
}

export default AddResourceForm;
