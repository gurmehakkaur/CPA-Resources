import React, { useState, useEffect } from 'react';
import ResourceCard from './ResourceCard';

function CourseDetails({ course }) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch(`/api/songs/${course.courseId}`)
      .then((response) => response.json())
      .then((data) => setResources(data));
  }, [course.courseId]);

  return (
    <section id="selected-course">
      <h2 id="coursename" >{course.name}</h2>
      <div id="urls">
        {course.urls.map((url, index) => (
          <span key={index}>
            <a id ="urls" href={url.url} target="_blank" rel="noopener noreferrer">
              {url.name}
            </a>
            {index < course.urls.length - 1 && '  |  '}
          </span>
        ))}
      </div>
      <div className="cardContainer">
        {resources.map((resource) => (
          <ResourceCard key={resource.ResourceId} resource={resource} />
        ))}
      </div>
    </section>
  );
}

export default CourseDetails;
