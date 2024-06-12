import axios from 'axios';
import { AuthorizationError } from './Exceptions'

// Function to get all enrolled courses by student ID
const getCourses = async (userId) => {
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
        const response = await axios.get(`/api/lms/student/courses/${userId}`, headersConfig);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error encountered! Check console logs.');
    }
}

export { getCourses };
