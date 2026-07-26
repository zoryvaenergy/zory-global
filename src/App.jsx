import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Team from "./pages/Team";
import DebugTools from "./pages/DebugTools";
import AdminDashboard from "./pages/AdminDashboard";
import TestTeamEngine from "./pages/TestTeamEngine";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />
<Route path="/profile" element={<Profile />} />
      <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route path="/team" element={<Team />} />
<Route path="/debug-tools" element={<DebugTools />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />
<Route path="/test-team-engine" element={<TestTeamEngine />} />
    </Routes>
  );
}

export default App;