import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const { facultyId } = useParams();
  const [semester, setSemester] = useState('all');
  const [publishedStatus, setPublishedStatus] = useState('all');
  const navigate = useNavigate(); // Hook from react-router-dom for navigation

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`https://doctrinalms.victoriouscoast-70b12acf.westus.azurecontainerapps.io/api/lms/faculty/courses/${facultyId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setError('Failed to fetch courses. Please try again later.');
      }
    };

    fetchCourses();
  }, [facultyId]);

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handlePublishedStatusChange = (event) => {
    setPublishedStatus(event.target.value);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Assuming the token is stored here
    navigate('/login'); // Redirect to the login page or home page after logout
  };

  const filteredCourses = courses.filter(course => {
    const semesterMatch = semester === 'all' || course.semester === semester;
    const publishedMatch = publishedStatus === 'all' || String(course.published) === publishedStatus;
    return semesterMatch && publishedMatch;
  });

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Course List</h1>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <select className="form-select" value={semester} onChange={handleSemesterChange}>
      
            <option value="all">All Courses </option>
            <option value="Fall23">Fall 2023</option>
            <option value="Spring24">Spring 2024</option>
          </select>
        </div>
        <div className="col-md-6">
          <select className="form-select" value={publishedStatus} onChange={handlePublishedStatusChange}>
            {/* <option value="all">All Courses</option> */}
            <option value="true">Published</option>
            <option value="false">Unpublished</option>
          </select>
        </div>
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="list-group">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <Link key={course.courseId} to={`/faculty/${facultyId}/courses/${course.courseId}`}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              {course.courseName}
              <span className="badge badge-primary badge-pill">Details</span>
            </Link>
          ))
        ) : (
          <div className="alert alert-info" role="alert">
            No courses found. Add some courses to get started.
          </div>
        )}
      </div>
      <footer className="footer bg-secondary p-3" style={{ width: "100%", position: "fixed", bottom: "0", left: "0", right: "0", margin: "0px", padding: "0px", textAlign: "center" }}>
        <div className="container-fluid">
          <p>@GoTeam2024</p>
        </div>
      </footer>
    </div>
  );
}

export default Courses;
