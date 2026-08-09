import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import About from "../components/About/About";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Tokenomics from "../components/Tokenomics/Tokenomics";
import Roadmap from "../components/Roadmap/Roadmap";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Stats from "../components/Stats/Stats";
import NFTComingSoon from "../components/NFT/NFTComingSoon";
function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
    useEffect(() => {

  const ref = searchParams.get("ref");

  if (!ref) return;

  sessionStorage.setItem("referralId", ref);

  console.log("Referral :", ref);

  navigate("/auth", { replace: true });

}, [searchParams, navigate]);

  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <Hero />
<Stats />
<WhyChoose />
<HowItWorks />
<Roadmap />
<Tokenomics />
<NFTComingSoon />
<About />
<Footer />
    </div>
  );
}

export default Home;