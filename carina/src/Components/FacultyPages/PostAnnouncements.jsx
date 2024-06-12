import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

function PostAnnouncement() {
  const { facultyId, courseId } = useParams();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  const handlePostAnnouncement = async (event) => {
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
      await axios.post(`https://doctrinalms.victoriouscoast-70b12acf.westus.azurecontainerapps.io/api/lms/faculty/postAnnouncement`, {
        announcement,
        courseId: parseInt(courseId),
        isPublished,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Announcement posted successfully!');
      navigate(`/faculty/${facultyId}/courses/${courseId}`);
    } catch (err) {
      console.error('Error posting announcement:', err);
      setError(err.response?.data?.message || 'Failed to post the announcement. Please try again.');
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
            <h2>Post Announcement For Course - {courseId}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handlePostAnnouncement}>
              <div className="mb-3">
                <label htmlFor="announcement" className="form-label">Announcement</label>
                <textarea id="announcement" className="form-control" value={announcement} onChange={(e) => setAnnouncement(e.target.value)} required></textarea>
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" id="isPublished" className="form-check-input" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
                <label htmlFor="isPublished" className="form-check-label">Publish</label>
              </div>
              <button type="submit" className="btn btn-primary" disabled={posting}>
                {posting ? 'Posting...' : 'Post Announcement'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostAnnouncement;
