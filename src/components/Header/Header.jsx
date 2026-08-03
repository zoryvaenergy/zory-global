import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";



import { connectWallet } from "../../services/web3/connectWallet";

import { checkWalletExists } from "../../services/web3/registration/checkWalletExists";



import "./header.css";



function Header() {



  const navigate = useNavigate();



  const [menuOpen, setMenuOpen] = useState(false);

  

  const [currentUser, setCurrentUser] = useState(null);



  useEffect(() => {



    const user = localStorage.getItem("currentUser");



    if (user) {

      setCurrentUser(JSON.parse(user));

    }



  }, []);



  const handleConnectWallet = async () => {



    try {



      const result = await connectWallet();



      if (!result.success) {

        alert(result.message);

        return;

      }



      const user = await checkWalletExists(result.walletAddress);

console.log("USER FROM checkWalletExists =", user);
console.log("TYPE =", typeof user);
console.log(checkWalletExists.toString());

      if (user) {

console.log("Saving to localStorage =", JSON.stringify(user));

        localStorage.setItem(

          "currentUser",

          JSON.stringify(user)

        );



        setCurrentUser(user);



        navigate("/dashboard");



        return;



      }



      navigate("/register");



    } catch (error) {



      alert(error.message);



    }



  };






  return (



    <header className="header">



      <div className="logo">

        ZORY <span>GLOBAL</span>

      </div>



      <button

        className="menu-toggle"

        onClick={() => setMenuOpen(!menuOpen)}

      >

        ☰

      </button>



      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>



        <Link

          to="/"

          className="nav-link"

          onClick={() => setMenuOpen(false)}

        >

          Home

        </Link>



        <a

          href="#roadmap"

          className="nav-link"

          onClick={() => setMenuOpen(false)}

        >

          Roadmap

        </a>



        <a

          href="#tokenomics"

          className="nav-link"

          onClick={() => setMenuOpen(false)}

        >

          Tokenomics

        </a>



        <div style={{ position: "relative" }}>            

        <button
  className="register-btn"
  onClick={handleConnectWallet}
>
  🔗 Connect Wallet
</button>

        


        </div>



      </nav>



    </header>



  );



}







export default Header; 