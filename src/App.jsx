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
import Wallet from "./pages/Wallet";
import Web3Test from "./pages/Web3Test";
import Web3Auth from "./pages/Web3Auth";

import WalletListener from "./services/web3/session/WalletListener";

function App() {
  return (
    <>
      <WalletListener />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<Web3Auth />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route path="/team" element={<Team />} />

        <Route path="/wallet" element={<Wallet />} />

        <Route
          path="/debug-tools"
          element={<DebugTools />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/test-team-engine"
          element={<TestTeamEngine />}
        />

        <Route
          path="/web3-test"
          element={<Web3Test />}
        />
      </Routes>
    </>
  );
}

export default App;