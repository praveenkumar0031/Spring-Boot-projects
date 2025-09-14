import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/User/Login";
import TodoBoard from "./components/TodoBoard/TodoBoard";
import Register from "./components/User/Register";
import ForgetPassword from "./components/User/Forget";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-passwword" element={<ForgetPassword />} />
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <TodoBoard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/forget-password" element={<ForgetPassword/>} />
      </Routes>
    </Router>

  );
}
export default App;
