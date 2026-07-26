import Footer from "../components/Footer/Footer";
import About from "../components/About/About";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Tokenomics from "../components/Tokenomics/Tokenomics";
import Roadmap from "../components/Roadmap/Roadmap";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Stats from "../components/Stats/Stats";

function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <Hero />
<Stats />
<WhyChoose />
<HowItWorks />
<Roadmap />
<Tokenomics />
<About />
<Footer />
    </div>
  );
}

export default Home;