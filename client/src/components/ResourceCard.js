import React from 'react';

function ResourceCard({ resource }) {
  return (
    <div className="card">
      <a href={resource.url} target="_blank" rel="noopener noreferrer">
        <img src={resource.imageUrl} alt={resource.title} className="card-image" />
      </a>
      <h3>{resource.title}</h3>
    </div>
  );
}

export default ResourceCard;
