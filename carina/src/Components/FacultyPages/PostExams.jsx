import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar'; 

function PostExam() {
  const { facultyId, courseId } = useParams();
  const navigate = useNavigate();
  const [examType, setExamType] = useState('ASSIGNMENT');
  const [question, setQuestion] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  const handlePostExam = async (event) => {
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
      await axios.post(`https://doctrinalms.victoriouscoast-70b12acf.westus.azurecontainerapps.io/api/lms/faculty/postExam`, {
        examType,
        isPublished,
        question,
        courseId: parseInt(courseId),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Exam posted successfully!');
      navigate(`/faculty/${facultyId}/courses/${courseId}`);
    } catch (err) {
      console.error('Error posting exam:', err);
      setError(err.response?.data?.message || 'Failed to post the exam. Please try again.');
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
            <h2>Post Exam For Course - {courseId}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handlePostExam}>
              <div className="mb-3">
                <label htmlFor="examType" className="form-label">Exam Type</label>
                <select id="examType" className="form-select" value={examType} onChange={(e) => setExamType(e.target.value)}>
                  <option value="ASSIGNMENT">Assignment</option>
                  <option value="QUIZ">Quiz</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="question" className="form-label">Question</label>
                <textarea id="question" className="form-control" value={question} onChange={(e) => setQuestion(e.target.value)}></textarea>
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" id="isPublished" className="form-check-input" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
                <label htmlFor="isPublished" className="form-check-label">Publish</label>
              </div>
              <button type="submit" className="btn btn-primary" disabled={posting}>
                {posting ? 'Posting...' : 'Post Exam'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostExam;
