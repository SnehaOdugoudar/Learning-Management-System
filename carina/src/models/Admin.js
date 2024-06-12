import axios from 'axios';
import { AuthorizationError } from './Exceptions'

// Function to get faculties
const getFaculties = async (userId) => {
    try {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        if (!token || !userId) {
            alert("Token/userId not found. Redirecting to login page...");
            throw new AuthorizationError("Token/userId not found. Please login first.");
        }

        const headersConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get(`/api/lms/admin/faculty`, headersConfig);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error encountered! Check console logs.');
    }
}

// Function to get courses
const getCourses = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        if (!token || !userId) {
            alert("Token/userId not found. Redirecting to login page...");
            throw new AuthorizationError("Token/userId not found. Please login first.");
        }

        const headersConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get(`/api/lms/admin/courses`, headersConfig);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error encountered! Check console logs.');
    }
}

// Function to assign course to faculty
const assignCourseToFaculty = async (courseId, facultyId) => {
    try {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        if (!token || !userId) {
            alert("Token/userId not found. Redirecting to login page...");
            throw new AuthorizationError("Token/userId not found. Please login first.");
        }

        const headersConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const response = await axios.post(`/api/lms/admin/assignCourseToFaculty`, {
            "courseId": parseInt(courseId),
            "facultyId": parseInt(facultyId)
        }, headersConfig);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error assigning course to faculty. Check console logs.');
    }
}

export { getFaculties, getCourses, assignCourseToFaculty };
