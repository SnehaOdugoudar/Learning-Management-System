import React, { useState, useEffect } from 'react';
import { getStudent, updateStudent } from '../models/Student';
import { getCourses } from '../models/Course';
import { useNavigate } from 'react-router-dom';
import { AuthorizationError } from '../models/Exceptions';

export default function GetStudent() {
    const [student, setStudent] = useState({});
    const username = sessionStorage.getItem('name');
    const userId = sessionStorage.getItem('userId');
    const [editedProfile, setEditedProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [semester, setSemester] = useState('current');
    const [courses, setCourses] = useState([]);
    const [expandedCourseId, setExpandedCourseId] = useState(null);
    const [activeTab, setActiveTab] = useState('home');
    const navigate = useNavigate();

    useEffect(() => {
        getStudent()
            .then((res) => {
                console.log(res);
                if (res.hasOwnProperty("password")) {
                    res["password"] = "";
                }
                setStudent(res);
                setEditedProfile(res);
            })
            .catch((e) => {
                if (e instanceof AuthorizationError) {
                    console.log('AuthorizationError:', e.message);
                    navigate('/');
                } else {
                    console.log(e.message);
                }
            });
    }, [navigate]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesData = await getCourses();
                setCourses(coursesData);
            } catch (error) {
                console.log('Error fetching courses:', error.message);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course => {
        if (semester === 'current') {
            return course.semester === 'Spring24';
        } else if (semester === 'previous') {
            return course.semester === 'Fall23';
        }
        return true;
    });

    const publishedFilteredCourses = filteredCourses.filter((course) => course.published);

    const handleSaveChanges = async () => {
        try {
            await updateStudent(editedProfile);
            setStudent(editedProfile); // Update displayed profile with edited data
            setIsEditing(false);
        } catch (error) {
            if (error instanceof AuthorizationError) {
                console.log('AuthorizationError:', error.message);
                navigate('/');
            } else {
                console.log(error.message);
            }
        }
    };

    const handleCancelEdit = () => {
        // Reset editedProfile to current student profile
        setEditedProfile(student);
        setIsEditing(false);
    };

    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
    };

    const handleCourseClick = (courseId) => {
        // Toggle expanded state for the clicked course
        setExpandedCourseId((prevId) => (prevId === courseId ? null : courseId));
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = (e) => {
        sessionStorage.setItem('userId', '');
        sessionStorage.setItem('name', '');
        sessionStorage.setItem('role', '');
        sessionStorage.setItem('email', '');
        sessionStorage.setItem('token', '');
        navigate(`/`);
    };

    return (
        <div className="container">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#name">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#courses">Courses</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#profile">Profile</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#logout" onClick={handleLogout}>Logout</a>
                </li>
            </ul>

            <div className="row">
                <div className="col-md-8">
                    <div className="tab-content">
                        <div id="name" className="container tab-pane active">
                            <h2>Welcome {username}</h2>
                        </div>
                        <div id="courses" className="container tab-pane fade">
                            <h2>Courses</h2>
                            <div className="form-group">
                                <label htmlFor="semesterSelect">Select Semester:</label>
                                <select
                                    className="form-control"
                                    id="semesterSelect"
                                    value={semester}
                                    onChange={handleSemesterChange}
                                >
                                    <option value="current">Current Semester</option>
                                    <option value="previous">Previous Semester</option>
                                </select>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Semester</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {publishedFilteredCourses.map((course) => (
                                        <React.Fragment key={course.courseId}>
                                            <tr class="table-dark" onClick={() => handleCourseClick(course.courseId)}>
                                                <td style={{ cursor: 'pointer' }}>{course.courseName}</td>
                                                <td style={{ cursor: 'pointer' }}>{course.semester}</td>
                                            </tr>
                                            {expandedCourseId === course.courseId && (
                                                <tr>
                                                    <td colSpan="2">
                                                        <div>
                                                            <ul className="nav nav-tabs">
                                                                <li className="nav-item">
                                                                    <a
                                                                        className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                                                                        onClick={() => handleTabClick('home')}
                                                                    >
                                                                        Home
                                                                    </a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a
                                                                        className={`nav-link ${activeTab === 'announcement' ? 'active' : ''}`}
                                                                        onClick={() => handleTabClick('announcement')}
                                                                    >
                                                                        Announcement
                                                                    </a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a
                                                                        className={`nav-link ${activeTab === 'syllabus' ? 'active' : ''}`}
                                                                        onClick={() => handleTabClick('syllabus')}
                                                                    >
                                                                        Syllabus
                                                                    </a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a
                                                                        className={`nav-link ${activeTab === 'assignments' ? 'active' : ''}`}
                                                                        onClick={() => handleTabClick('assignments')}
                                                                    >
                                                                        Assignments
                                                                    </a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a
                                                                        className={`nav-link ${activeTab === 'quizzes' ? 'active' : ''}`}
                                                                        onClick={() => handleTabClick('quizzes')}
                                                                    >
                                                                        Quizzes
                                                                    </a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a
                                                                        className={`nav-link ${activeTab === 'grade' ? 'active' : ''}`}
                                                                        onClick={() => handleTabClick('grade')}
                                                                    >
                                                                        Grade
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <div className="tab-content">
                                                                <div className={`tab-pane ${activeTab === 'home' ? 'active show' : ''}`}>
                                                                    <h3>Welcome to the Course!</h3>
                                                                    <p>{course.courseName}</p>
                                                                </div>
                                                                <div className={`tab-pane ${activeTab === 'announcement' ? 'active show' : ''}`}>
                                                                    <h3>Announcements</h3>
                                                                    <table className="table">
                                                                        <thead>
                                                                            <tr></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {course.announcements.map((announcement) => (
                                                                                <tr>
                                                                                    <td>{announcement.announcement}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div className={`tab-pane ${activeTab === 'syllabus' ? 'active show' : ''}`}>
                                                                    <h3>Course Syllabus</h3>
                                                                    <p>View the course content here.</p>
                                                                    <p>{course.content}</p>
                                                                </div>
                                                                <div className={`tab-pane ${activeTab === 'assignments' ? 'active show' : ''}`}>
                                                                    <table className="table">
                                                                        <thead>
                                                                            <tr></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {course.exams
                                                                            .filter((exam) => exam.examType.startsWith('ASSIGNMENT') && exam.published)
                                                                            .map((exam, index) => (
                                                                                <tr key={index}>
                                                                                    <td>{exam.question}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div className={`tab-pane ${activeTab === 'quizzes' ? 'active show' : ''}`}>
                                                                    <table className="table">
                                                                        <thead>
                                                                            <tr></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {course.exams
                                                                            .filter((exam) => exam.examType.startsWith('QUIZ') && exam.published)
                                                                            .map((exam, index) => (
                                                                                <tr key={index}>
                                                                                    <td>{exam.question}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div className={`tab-pane ${activeTab === 'grade' ? 'active show' : ''}`}>
                                                                    <h3>Grade</h3>
                                                                    {course.grades && course.grades.length > 0 ? (
                                                                        <p>Your current grade in the course: {course.grades[0].grade}</p>
                                                                    ) : (
                                                                        <p>No grades available for this course</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div id="profile" className="container tab-pane fade">
                            <h2>User information</h2>
                            {isEditing ? (
                                <form>
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Change Username:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={editedProfile.name || ''}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Update password:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="password"
                                            value={editedProfile.password || ''}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, password: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="notificationFrequency">Update NotificationFrequency:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="notificationFrequency"
                                            value={editedProfile.notificationFrequency || ''}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, notificationFrequency: e.target.value })}
                                        />
                                    </div>
                                    <button type="button" className="btn btn-primary me-2" onClick={handleSaveChanges}>
                                        Save Changes
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <p className="mb-3">Name: {student.name}</p>
                                    <p className="mb-3">Email: {student.email}</p>
                                    <p className="mb-3">NotificationFrequency: {student.notificationFrequency}</p>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit Profile
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div id="logout" className="container tab-pane fade">
                    </div>
                </div>
            </div>
        </div>
    );
}