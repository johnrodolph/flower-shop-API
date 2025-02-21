import axios from "axios";

const API_URL = "http://localhost:8080/flower"; // ✅ Change if your backend URL is different

// Fetch all flowers
export const getAllFlowers = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllFlowers`);
        return response.data;
    } catch (error) {
        console.error("Error fetching flowers:", error);
        return [];
    }
};
