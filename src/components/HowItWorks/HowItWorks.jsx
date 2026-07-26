import "./howItWorks.css";
import {
  FaUserPlus,
  FaUsers,
  FaProjectDiagram,
  FaGift
} from "react-icons/fa";

function HowItWorks() {

  const steps = [

    {
      icon: <FaUserPlus />,
      title: "Register",
      text: "Create your account and become part of ZORY GLOBAL."
    },

    {
      icon: <FaUsers />,
      title: "Build Network",
      text: "Invite people and grow your trusted community."
    },

    {
      icon: <FaProjectDiagram />,
      title: "Grow Together",
      text: "Expand your network with smart collaboration."
    },

    {
      icon: <FaGift />,
      title: "Unlock Rewards",
      text: "Enjoy benefits as your community continues to grow."
    }

  ];

  return (

    <section className="how-it-works">

      <div className="container">

        <div className="how-header">

          <span>HOW IT WORKS</span>

          <h2>
            Start Your Journey
            <br />
            In 4 Easy Steps
          </h2>

          <p>
            Follow a simple four-step process to begin your journey with ZORY GLOBAL.
          </p>

        </div>

        <div className="steps-wrapper">

          {steps.map((step, index) => (

            <div className="step-card" key={index}>

              <div className="step-icon">
                {step.icon}
              </div>

              <h3>{step.title}</h3>

              <p>{step.text}</p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default HowItWorks;