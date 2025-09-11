import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/User/Login";
import TodoBoard from "./components/todoBoard/TodoBoard";
import Register from "./components/User/Register";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div>
      <Register/>
    </div>
  );
}
export default App;
