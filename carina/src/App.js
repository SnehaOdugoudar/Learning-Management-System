import React from 'react';
import { BrowserRouter as Router, Route ,Routes } from 'react-router-dom';


import './App.css';
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Courses from './Components/FacultyPages/Courses';
import CourseDetail from './Components/FacultyPages/CourseDetail';
import PostExam from './Components/FacultyPages/PostExams';
import PostAnnouncement from './Components/FacultyPages/PostAnnouncements';
import AddEditSyllabus from './Components/FacultyPages/AddEditSyllabus';
import StudentView from './Components/FacultyPages/StudentView';


import Student from "./pages/Student";
import Admin from "./pages/Admin";




function App() {

  
  return (

    
    <Router>
      <div>
        <Routes>
          <Route path="/home" element= { <Home/>} />
          <Route path="/" element= { <Register/>} />
          <Route path="/register" element= { <Register/>} />
          <Route path="/login" element= { <Login/>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/student" element={<Student />} />
          {/* Faculty Routes */}
          <Route path="/faculty/:facultyId/courses" element={<Courses />} />
          <Route path="/faculty/:facultyId/courses/:courseId" element={<CourseDetail />} />
          <Route path="/faculty/:facultyId/courses/:courseId/postexams" element={<PostExam />} />
          <Route path="/faculty/:facultyId/courses/:courseId/postannouncements" element={<PostAnnouncement />} />
          <Route path="/faculty/:facultyId/courses/:courseId/AddEditSyllabus" element={<AddEditSyllabus />}/>
          <Route path="/faculty/:facultyId/courses/:courseId/StudentView" element={<StudentView/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;