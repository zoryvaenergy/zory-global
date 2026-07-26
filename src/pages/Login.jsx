import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";

import auth from "../firebase/auth";
import { database } from "../firebase/firebaseConfig";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const snapshot = await get(ref(database, "users"));

      if (!snapshot.exists()) {
        alert("User not found");
        return;
      }

      const users = snapshot.val();

     let foundEmail = null;
let currentUser = null;

for (const uid in users) {

  const user = users[uid];

  if (user.profile?.userId === email) {

    foundEmail = user.auth?.email;

    currentUser = user;

    break;
  }
}

      if (!foundEmail) {
        alert("Invalid User ID");
        return;
      }

      await signInWithEmailAndPassword(
        auth,
        foundEmail,
        password
      );

      alert("Login successful");
     console.log("Current User :", currentUser);

localStorage.setItem(
  "currentUser",
  JSON.stringify(currentUser)
);

console.log(
  "Saved :",
  JSON.parse(localStorage.getItem("currentUser"))
);
      navigate("/dashboard");
      
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
      }}
    >
      <div
        style={{
          width: "400px",
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
            color: "white",
          }}
        >
          Login
        </h1>

        <input
          type="text"
          placeholder="Enter User ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            boxSizing: "border-box",
          }}
        />
<p
  onClick={() => navigate("/forgot-password")}
  style={{
    cursor: "pointer",
    color: "#4da6ff",
    marginTop: "10px",
  }}
>
  Forgot Password?
</p>
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            background: "#4f46e5",
            color: "white",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;