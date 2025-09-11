import axios from "axios";

const API_URL = "http://localhost:8080/auth"; // adjust your backend URL

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data.token; // assuming backend returns { token: "..." }
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

const registerUser = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

const forgetPassword = async (email) => {
  return axios.post(`${API_URL}/forgot-password`, { email });
};

export default {
  loginUser,
  registerUser,
  forgetPassword,
};
