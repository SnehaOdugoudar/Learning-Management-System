import React from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.css'; // Ensure CSS path is correct

function Sidebar({ facultyId, courseId }) {
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? "nav-link text-white active-link" : "nav-link text-white";
  };

  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.clear();
  };


  return (
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <NavLink to={`/faculty/${facultyId}/courses`} className={getNavLinkClass}>
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/faculty/${facultyId}/courses/${courseId}`} className={getNavLinkClass}>
          Course Details
        </NavLink>
      </li>
      {/* <li className="nav-item">
        <NavLink to={`/faculty/${facultyId}/courses/${courseId}/ViewStudents`} className={getNavLinkClass}>
          View Students
        </NavLink>
      </li> */}

      <li className="nav-item">
        <NavLink to={`/faculty/${facultyId}/courses/${courseId}/StudentView`} className={getNavLinkClass} >
          View Students
        </NavLink>
     </li>



      <li className="nav-item">
        <NavLink to={`/faculty/${facultyId}/courses/${courseId}/AddEditSyllabus`} className={getNavLinkClass}>
          Add/Edit Syllabus
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/faculty/${facultyId}/courses/${courseId}/postannouncements`} className={getNavLinkClass}>
          Post Announcements
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/faculty/${facultyId}/courses/${courseId}/postexams`} className={getNavLinkClass}>
          Post Exams
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/login" className={getNavLinkClass} onClick={handleLogout}>
          Logout
        </NavLink>
      </li>
    </ul>
  );
}

export default Sidebar;
