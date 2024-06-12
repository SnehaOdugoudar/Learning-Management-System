import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

function CourseDetails() {
  const { facultyId, courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setError("Authorization token is not available. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://doctrinalms.victoriouscoast-70b12acf.westus.azurecontainerapps.io/api/lms/faculty/courses/${facultyId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const foundCourse = response.data.find(c => c.courseId === parseInt(courseId));
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError('No such course found.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch course details:', error);
        setError('Failed to load course details. Please check your permissions.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [facultyId, courseId]);

  const handlePublishToggle = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setError("Authorization token is not available. Please log in again.");
        return;
      }

      const updatedCourse = { ...course, published: !course.published };
      await axios.put(`api/lms/faculty/courses/${course.courseId}`, updatedCourse, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourse(updatedCourse);
    } catch (error) {
      console.error('Failed to update course:', error);
      setError('Failed to update course. Please try again later.');
    }
  };

  if (loading) {
    return <div className="container text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>;
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">
      {error}
    </div>;
  }

  if (!course) {
    return <div className="alert alert-info">No course details available.</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-secondary min-vh-100 p-3">
          <Sidebar facultyId={facultyId} courseId={courseId} />
        </div>
        <div className="col-md-9">
          {/* Main content */}
          <div className="py-3">
            <h2>{course.courseName}</h2>
            <p><strong>Semester:</strong> {course.semester}</p>
            
            <p><strong>Content:</strong> {course.content || "No content provided"}</p>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="publishToggle"
                checked={course.published}
                onChange={handlePublishToggle}
              />
              <label className="form-check-label" htmlFor="publishToggle">
                {course.published ? "Published" : "Unpublished"}
              </label>
            </div>
            {/* Additional course details and links can be placed here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
