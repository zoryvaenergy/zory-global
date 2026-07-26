import { useState } from "react";
import { registerUser } from "../services/registration/registerUser";
import SuccessModal from "../components/auth/SuccessModal/SuccessModal";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState({
  memberName: "",
  memberId: "",
  sponsorId: "",
  status: "",
});
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sponsorId, setSponsorId] = useState("");

  const handleRegister = async () => {
    try {
      const newUser = await registerUser({
  fullName,
  mobile,
  email,
  password,
  confirmPassword,
  sponsorId,
});

setSuccessData({
  memberName: newUser.fullName,
  memberId: newUser.userId,
  sponsorId: newUser.sponsorId,
  status: newUser.status,
});

setShowSuccess(true);

      setFullName("");
      setMobile("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSponsorId("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050b25",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "#101935",
          padding: "40px",
          borderRadius: "20px",
          border: "1px solid #2d3b6b",
          boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#fff",
          }}
        >
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          style={inputStyle}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Mobile Number"
          style={inputStyle}
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address (Optional)"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          style={inputStyle}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <input
  type="text"
  placeholder="Sponsor ID (Optional)"
  style={inputStyle}
  value={sponsorId}
  onChange={(e) => setSponsorId(e.target.value)}
/>

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            background: "#4f46e5",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Create Account
        </button>
      </div>
     <SuccessModal
  open={showSuccess}
  memberName={successData.memberName}
  memberId={successData.memberId}
  sponsorId={successData.sponsorId}
  status={successData.status}
  onContinue={() => {
  setShowSuccess(false);
  navigate("/login");
}}
/>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "18px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "15px",
};

export default Register;