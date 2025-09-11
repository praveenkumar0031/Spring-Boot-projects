import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/User/Login";
import TodoBoard from "./components/todoBoard/TodoBoard";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <TodoBoard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
