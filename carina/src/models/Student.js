import axios from 'axios';
import { AuthorizationError } from './Exceptions'

// Function to get student by student ID
const getStudent = async (userId) => {
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
        const response = await axios.get(`/api/lms/student/${userId}`, headersConfig);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error encountered! Check console logs.');
    }
}

// Function to update student profile
const updateStudent = async (updatedProfile) => {
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

        // filter out useless keys
        let profile = { ...updatedProfile };
        if (profile.hasOwnProperty("createdAt")) {
            delete profile["createdAt"];
        }
        if (profile.hasOwnProperty("email")) {
            delete profile["email"];
        }
        if (profile.hasOwnProperty("role")) {
            delete profile["role"];
        }
        if (profile.hasOwnProperty("enrolledCourses")) {
            delete profile["enrolledCourses"];
        }
        profile["notificationFrequency"] = parseInt(profile["notificationFrequency"]);
        const response = await axios.post(`/api/lms/student/postStudentProfile`, profile, headersConfig);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error updating student profile. Check console logs.');
    }
}

export { getStudent, updateStudent };
