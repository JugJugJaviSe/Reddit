import { authApi } from "./api_services/auth_api/AuthAPIService";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";
import UserDashboard from "./pages/dashboard/UserDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage authApi = {authApi}/>}></Route>
      <Route path="/register" element={<RegisterPage authApi={authApi}/>}></Route>

      <Route
        path="/user-dashboard"
        element ={<ProtectedRoute requiredRole="user"><UserDashboard/></ProtectedRoute>}
      ></Route>

    </Routes>
  );
};

export default App;
