import React from 'react';

function CourseMenu({ courses, onSelectCourse }) {
  return (
    <div id="menu">
      {courses.map((course) => (
        <button key={course.courseId} onClick={() => onSelectCourse(course)}>
          {course.name}
        </button>
      ))}
    </div>
  );
}

export default CourseMenu;
