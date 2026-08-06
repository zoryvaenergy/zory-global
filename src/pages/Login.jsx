import { useState } from "react";
import { openTrustApp } from "../services/web3/actions/openTrustApp";
import { useNavigate } from "react-router-dom";
import WalletModal from "../components/WalletModal/WalletModal";
import { loginWithWallet } from "../services/web3/login/loginWithWallet";

function Login() {

  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const result = await loginWithWallet();

      if (!result.success) {

        alert(result.message);

        navigate("/register");

        return;

      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify(result.user)
      );

      alert("Wallet Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    }

  };

  return (

    <>

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
              marginBottom: "10px",
              color: "#ffffff",
            }}
          >
            Login
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#94a3b8",
              marginBottom: "30px",
              fontSize: "15px",
            }}
          >
            Connect your Trust Wallet to continue
          </p>

          <div
            style={{
              background: "#162248",
              border: "1px solid #2d3b6b",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px",
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "14px",
            }}
          >
            Wallet authentication will be used instead of User ID.
          </div>

          <div
            style={{
              background: "#162248",
              border: "1px solid #2d3b6b",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px",
              textAlign: "center",
              color: "#22c55e",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            🔒 Login is secured by your Trust Wallet
          </div>

          <div
            style={{
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "15px",
            }}
          >
            Don't have a Trust Wallet?
          </div>

          <button
            onClick={() => setIsWalletOpen(true)}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#4f46e5",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Connect Trust Wallet
          </button>

          <button
            onClick={openTrustApp}
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "12px",
              border: "1px solid #4f46e5",
              borderRadius: "10px",
              background: "transparent",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Open Trust Wallet
          </button>

        </div>

      </div>

      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        onConnected={async () => {

          setIsWalletOpen(false);

          await handleLogin();

        }}
      />

    </>

  );

}

export default Login;