import { getCurrentAccount } from "../services/web3/walletService";
import { useState, useEffect } from "react";
import { sendPayment } from "../services/web3/payment/sendPayment";
import { registerUser } from "../services/registration/registerUser";
import SuccessModal from "../components/auth/SuccessModal/SuccessModal";
import { useNavigate } from "react-router-dom";
import { savePayment } from "../services/web3/payment/savePayment";
import { verifyPayment } from "../services/web3/payment/verifyPayment";
import { connectWallet } from "../services/web3/connectWallet";
import { checkWalletExists } from "../services/web3/registration/checkWalletExists";
function Register() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState({
  
  memberId: "",
  sponsorId: "",
  status: "",
});
 
  const [sponsorId, setSponsorId] = useState("");
const [loading, setLoading] = useState(false);
const [walletAddress, setWalletAddress] = useState("");
useEffect(() => {

  async function loadWallet() {

    const wallet = await getCurrentAccount();

    if (wallet) {
      setWalletAddress(wallet);
    }

  }

  loadWallet();

}, []);
       const handleConnectWallet = async () => {

  const result = await connectWallet();

  if (!result.success) {
    alert(result.message);
    return;
  }

  setWalletAddress(result.walletAddress);

};
  const handleRegister = async () => {
    console.log("Wallet :", walletAddress);
    
    if (loading) return;

setLoading(true);

try {

  const walletExists = await checkWalletExists(walletAddress);

 if (walletExists) {

  alert("This wallet is already registered.\nRedirecting to Login...");

  setLoading(false);

  navigate("/login");

  return;

}
      const paymentResult = await sendPayment();

console.log("Payment Result:", paymentResult);

const verification = await verifyPayment(paymentResult);

console.log("Verification Result:", verification);

if (!verification.success) {
  throw new Error(verification.message);
}

console.log("Verification Result:", verification);
console.log("Sending Data", {
  walletAddress,
  provider: "OKX Wallet",
  network: "BNB Chain",
  chainId: 56,
});
const newUser = await registerUser({
  sponsorId,

  walletAddress,

  provider: "OKX Wallet",
  network: "BNB Chain",
  chainId: 56,
});
setSuccessData({
  
  memberId: newUser.userId,
  sponsorId: newUser.sponsorId,
  status: newUser.status,
});

setShowSuccess(true);

      
      setSponsorId("");
    } catch (error) {
  alert(error.message);
} finally {
  setLoading(false);
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
    marginBottom: "10px",
    color: "#fff",
    fontSize: "32px",
    fontWeight: "700",
  }}
>
  JOIN ZORY GLOBAL
</h1>

<p
  style={{
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: "30px",
    lineHeight: "24px",
    fontSize: "15px",
  }}
>
  Become a member of the decentralized ZORY GLOBAL community using your wallet.
</p>

        

       

        
        

        

        <input
  type="text"
  placeholder="Sponsor ID (Optional)"
  style={inputStyle}
  value={sponsorId}
  onChange={(e) => setSponsorId(e.target.value)}
/>
    <button
  onClick={handleConnectWallet}
  style={{
    width: "100%",
    padding: "15px",
    marginBottom: "18px",
    border: "none",
    borderRadius: "10px",
    background: walletAddress ? "#16a34a" : "#f59e0b",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  }}
>
  {walletAddress
    ? "✅ Wallet Connected"
    : "🔗 Connect OKX Wallet"}
</button>
{walletAddress && (
  <div
    style={{
      marginBottom: "20px",
      color: "#22c55e",
      fontSize: "14px",
      wordBreak: "break-all",
      textAlign: "center",
    }}
  >
    {walletAddress}
  </div>
)}
        <button
  onClick={handleRegister}
  disabled={loading}
  style={{
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: loading ? "#9ca3af" : "#4f46e5",
    color: "#fff",
    cursor: loading ? "not-allowed" : "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    opacity: loading ? 0.7 : 1,
  }}
>
  {loading ? "Creating Account..." : "Create Account"}
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