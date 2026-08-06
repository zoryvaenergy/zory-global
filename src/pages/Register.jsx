
import { useState, useEffect } from "react";
import { sendPayment } from "../services/web3/payment/sendPayment";
import { registerUser } from "../services/registration/registerUser";
import SuccessModal from "../components/auth/SuccessModal/SuccessModal";
import { useNavigate, useLocation } from "react-router-dom";
import { savePayment } from "../services/web3/payment/savePayment";
import { verifyPayment } from "../services/web3/payment/verifyPayment";

import { checkWalletExists } from "../services/web3/registration/checkWalletExists";


function Register() {
  const navigate = useNavigate();
const location = useLocation();

const wallet = location.state?.wallet;

console.log("Wallet :", wallet);

const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState({
  
  memberId: "",
  sponsorId: "",
  status: "",
});
 
  const [sponsorId, setSponsorId] = useState(
  sessionStorage.getItem("referralId") || ""
);
console.log(
  "Referral From Session:",
  sessionStorage.getItem("referralId")
);
const [loading, setLoading] = useState(false);


const [walletAddress] = useState(
  wallet?.walletAddress || ""
);
useEffect(() => {

  if (!walletAddress) {

    navigate("/auth", {
      replace: true,
    });

  }

}, [walletAddress, navigate]);

//useEffect(() => {

  //async function loadWallet() {

    //const wallet = await getCurrentAccount();

    //if (wallet) {
    //  setWalletAddress(wallet);
    //}

  //}

  //loadWallet();

//}, []);
     
      
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
 provider: wallet?.walletType,
  network: wallet?.network,
  chainId: wallet?.chainId,
  
});
setSuccessData({

  memberName: newUser.memberName,

  memberId: newUser.userId,

  sponsorId: newUser.sponsorId,

  status: newUser.status,

  user: newUser.user,

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

   localStorage.setItem(
  "currentUser",
  JSON.stringify(successData.user)
);

    navigate("/dashboard");
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