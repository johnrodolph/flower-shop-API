import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_SPRINGBOOT_BASE_URL, // ✅ Now using .env variable
});

export default api;
