// Assuming your AddEditSyllabus.jsx is located at a relevant path within your project structure

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

function AddEditSyllabus() {
  const { facultyId, courseId } = useParams();
  const navigate = useNavigate();
  const [syllabusContent, setSyllabusContent] = useState('');
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  const handlePostSyllabus = async (event) => {
    event.preventDefault();
    setPosting(true);
    setError('');

    const token = sessionStorage.getItem('token');
    if (!token) {
      setError("Authorization token is not available. Please log in again.");
      setPosting(false);
      return;
    }

    try {
      await axios.post(`https://doctrinalms.victoriouscoast-70b12acf.westus.azurecontainerapps.io/api/lms/faculty/postCourseContent`, {
        courseContent: syllabusContent,
        courseId: parseInt(courseId),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Syllabus updated successfully!');
      navigate(`/faculty/${facultyId}/courses/${courseId}`);
    } catch (err) {
      console.error('Error posting syllabus:', err);
      setError(err.response?.data?.message || 'Failed to update the syllabus. Please try again.');
      setPosting(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-secondary min-vh-100 p-3">
          <Sidebar facultyId={facultyId} courseId={courseId} />
        </div>
        <div className="col-md-9">
          <div className="py-3">
            <h2>Edit Syllabus for Course - {courseId}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handlePostSyllabus}>
              <div className="mb-3">
                <label htmlFor="syllabusContent" className="form-label">Syllabus Content</label>
                <textarea id="syllabusContent" className="form-control" value={syllabusContent} onChange={(e) => setSyllabusContent(e.target.value)}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" disabled={posting}>
                {posting ? 'Updating...' : 'Update Syllabus'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditSyllabus;
