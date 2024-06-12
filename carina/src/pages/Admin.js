import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getFaculties, getCourses, assignCourseToFaculty } from '../models/Admin';
import { AuthorizationError } from '../models/Exceptions';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home');
    const [courses, setCourses] = useState({});
    const [faculties, setFaculties] = useState({});
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [semester, setSemester] = useState('All');
    const [filterFaculty, setFilterFaculty] = useState('All');
    const [expandedCourseId, setExpandedCourseId] = useState(null);
    
    useEffect(() => {
        getCourses()
            .then((res) => {
                console.log(res);
                setCourses(res);
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
        const fetchFaculties = async () => {
            try {
                const data = await getFaculties();
                setFaculties(data);
            } catch (error) {
                console.log('Error fetching courses:', error.message);
            }
        };

        fetchFaculties();
    }, []);

    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
    };

    const handleFacultyChange = (e) => {
        setSelectedFaculty(e.target.value);
    };

    const handleFilterFacultyChange = (e) => {
        setFilterFaculty(e.target.value);
    };

    const handleFacultySubmit = async (courseId, facultyId) => {
        try {
            await assignCourseToFaculty(courseId, facultyId);
            alert(`Course ${courseId} assigned to faculty ${facultyId} successfully.`);
            getCourses().then((res) => {
                console.log(res);
                setCourses(res);
            })
            .catch((e) => {
                if (e instanceof AuthorizationError) {
                    console.log('AuthorizationError:', e.message);
                    navigate('/');
                } else {
                    console.log(e.message);
                }
            });
        } catch (error) {
            console.error('Error assigning course to faculty:', error.message);
        }
    }

    const handleCourseClick = (courseId) => {
        // Toggle expanded state for the clicked course
        setExpandedCourseId((prevId) => (prevId === courseId ? null : courseId));
    };

    const handleLogOut = (e) => {
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
                    <button className={activeTab === 'home' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('home')}>Homepage</button>
                </li>
                <li className="nav-item">
                    <button className={activeTab === 'courses' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('courses')}>Course</button>
                </li>
                <li className="nav-item">
                    <button className="nav-link" onClick={handleLogOut}>Log Out</button>
                </li>
            </ul>

            {activeTab === 'home' && (
                <div>Welcome to the Admin Dashboard!</div>
            )}

            {activeTab === 'courses' && (
                <div>
                    <h2>Manage all courses:</h2>
                    <div className="form-group">
                        <label htmlFor="semesterSelect">Semester:</label>
                        <select
                            className="form-control"
                            id="semesterSelect"
                            value={semester}
                            onChange={handleSemesterChange}
                        >
                            <option value="All">All</option>
                            <option value="Fall24">Fall24</option>
                            <option value="Spring24">Spring24</option>
                            <option value="Fall23">Fall23</option>
                        </select>
                        <label htmlFor="facultySelect">Faculty:</label>
                        <select
                            className="form-control"
                            id="filterFaculty"
                            value={filterFaculty}
                            onChange={handleFilterFacultyChange}
                        >
                            <option value="All">All</option>
                            {Object.values(faculties).map((faculty) => (
                               <option key={faculty.name} value={faculty.name}>
                                   {faculty.name}
                               </option>
                           ))}
                        </select>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Semester</th>
                                <th>Faculty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => {
                                if (semester !== 'All' && course.semester !== semester) {
                                    return null;
                                }
                                if (filterFaculty !== 'All' && course.faculty.name !== filterFaculty) {
                                    return null;
                                }
                                return (
                                <React.Fragment key={course.courseId}>
                                    <tr class="table-dark" onClick={() => handleCourseClick(course.courseId)}>
                                        <td style={{ cursor: 'pointer' }}>{course.courseName}</td>
                                        <td style={{ cursor: 'pointer' }}>{course.semester}</td>
                                        <td style={{ cursor: 'pointer' }}>{course.faculty.name}</td>
                                    </tr>
                                    {expandedCourseId === course.courseId && (
                                        <tr>
                                            {course.semester === "Fall24" ? (
                                                <td colSpan="3">
                                                    Assign to faculty: <select
                                                       className="form-control"
                                                       value={selectedFaculty || course.faculty.name}
                                                       onChange={handleFacultyChange}
                                                   >
                                                       {Object.values(faculties).map((faculty) => (
                                                           <option key={faculty.userId} value={faculty.userId}>
                                                               {faculty.name}
                                                           </option>
                                                       ))}
                                                   </select><button onClick={() => handleFacultySubmit(course.courseId, selectedFaculty)}>Assign</button>
                                                </td>
                                            ) : (
                                                <td colSpan="3">
                                                    Enrolled students:
                                                       <table className="table">
                                                           <thead>
                                                               <tr>
                                                                   <th>Name</th>
                                                                   <th>Email</th>
                                                               </tr>
                                                           </thead>
                                                           <tbody>
                                                               {course.students.map((student) => (
                                                                   <tr>
                                                                       <td>{student.name}</td>
                                                                       <td>{student.email}</td>
                                                                   </tr>
                                                               ))}
                                                           </tbody>
                                                       </table>
                                                </td>
                                            )}
                                        </tr>
                                    )}
                                </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};


