import { useState } from "react";

import { sendPasswordResetEmail } from "firebase/auth";

import auth from "../firebase/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);

      alert(
        "Password reset link aapke email par bhej diya gaya hai."
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050b25",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "300px",
          padding: "12px",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      />

      <br />
      <br />

      <button
        onClick={handleResetPassword}
        style={{
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Send Reset Link
      </button>
    </div>
  );
}

export default ForgotPassword;