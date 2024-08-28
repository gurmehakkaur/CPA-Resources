import React, { useState, useEffect } from 'react';
import CourseMenu from './components/CourseMenu';
import CourseDetails from './components/CourseDetails';
import NewsletterForm from './components/NewsletterForm';
import AddResourceForm from './components/AddResourceForm'; 
import './App.css';

function App() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch('/api/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        if (data.length > 0) {
          setSelectedCourse(data[0]);
        }
      });
  }, []);

  const handleResourceAdded = (newResource) => {
    setResources([...resources, newResource]);
  };

  return (
    <div className="App">
      <header>
        <img src="https://2023.lightboxexpo.com/wp-content/uploads/2023/09/Seneca-Polytechnic_Logo.jpg" alt="College Logo" className="college-logo" />
        <div className="header-content">
          <h2 id="heading-h2">Self-Study Resources for</h2>
          <h1 id="heading-h1"> Computer Programming and Analysis </h1>
          <h4 id="heading-h4">House of best YouTube videos to ace the courses at Seneca</h4>
        </div>
        <CourseMenu courses={courses} onSelectCourse={setSelectedCourse} />
      </header>
      <main>
        {selectedCourse && <CourseDetails course={selectedCourse} />}
        <AddResourceForm onResourceAdded={handleResourceAdded} /> {}
      </main>
      <footer>
        <NewsletterForm />
        <p className="copyright">© 2024 Gurmehak Kaur Uppal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
