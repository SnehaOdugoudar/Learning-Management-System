import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

function StudentView() {
  const { facultyId, courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
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
        if (foundCourse && foundCourse.students) {
          const localStorageKey = `assignedGrades_${courseId}`;
          const storedGrades = JSON.parse(localStorage.getItem(localStorageKey)) || {};
          const studentsWithGrades = foundCourse.students.map(student => ({
            ...student,
            assignedGrade: storedGrades[student.userId] || ''
          }));

          setStudents(studentsWithGrades);

          const initialGrades = foundCourse.students.reduce((acc, student) => {
            acc[student.userId] = '';
            return acc;
          }, {});
          setGrades(initialGrades);
        } else {
          setError('No students found for this course.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch students:', error);
        setError('Failed to load students. Please check your permissions.');
        setLoading(false);
      }
    };

    fetchStudents();
  }, [facultyId, courseId]);

  const handleGradeChange = (studentId, grade) => {
    setGrades(prevGrades => ({
      ...prevGrades,
      [studentId]: grade
    }));
  };

  const assignGrade = async (studentId) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setError("Authorization token is not available. Please log in again.");
      return;
    }

    try {
      await axios.post(`https://doctrinalms.victoriouscoast-70b12acf.westus.azurecontainerapps.io/api/lms/faculty/assignGrade`, {
        studentId,
        courseId: parseInt(courseId),
        grade: grades[studentId]
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update the assignedGrade for the student in the students state
      setStudents(prevStudents => prevStudents.map(student =>
        student.userId === studentId
          ? { ...student, assignedGrade: grades[studentId] }
          : student
      ));

      // Clear the input field after assigning the grade
      setGrades(prevGrades => ({
        ...prevGrades,
        [studentId]: ''
      }));

      // Persist assigned grades in localStorage
      const localStorageKey = `assignedGrades_${courseId}`;
      const storedGrades = JSON.parse(localStorage.getItem(localStorageKey)) || {};
      storedGrades[studentId] = grades[studentId];
      localStorage.setItem(localStorageKey, JSON.stringify(storedGrades));

    } catch (error) {
      console.error('Failed to assign grade:', error);
      setError('Failed to assign grade. Please try again later.');
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

  if (students.length === 0) {
    return <div className="alert alert-info">No students enrolled in this course.</div>;
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
            <h2 className="mb-4">Student List</h2>
            <div className="list-group">
              {students.map((student, index) => (
                <div key={student.userId} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{index + 1}. {student.name}</h5>
                    <p className="mb-1">{student.email}</p>
                  </div>
                  <div className="input-group" style={{ maxWidth: '250px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Grade"
                      value={grades[student.userId]}
                      onChange={(e) => handleGradeChange(student.userId, e.target.value)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => assignGrade(student.userId)}
                    >
                      Assign Grade
                    </button>
                  </div>
                  <span className="badge bg-success text-white ms-2">
                    {student.assignedGrade ? `Assigned: ${student.assignedGrade}` : 'No grades yet'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentView;
