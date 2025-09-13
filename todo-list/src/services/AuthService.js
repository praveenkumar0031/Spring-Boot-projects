import axios from "axios";

const API_URL = "http://localhost:8080/auth"; // adjust your backend URL

// 🔹 Login
const loginUser = async (email,pass) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {"email":email,"password":pass});
    return response.data.token; // assuming backend returns { token: "..." }
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

// 🔹 Register
const registerUser = async (email,pass,fav) => {
  try {
    //console.log(fav);
    const response = await axios.post(`${API_URL}/register`, {"email":email,"password":pass,"favourite":fav});
    return response.data; // backend response (e.g., success message or created user)
  } catch (err) {
    throw new Error(err.response?.data?.message || "Registration failed");
  }
};

// 🔹 Forgot Password
const forgetPassword = async (email,fav,newpass) => {
  try {
    const response = await axios.put(`${API_URL}/forget-password`, { "email":email,"favourite":fav,"password":newpass });
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Request failed");
  }
};

export default {
  loginUser,
  registerUser,
  forgetPassword,
};
