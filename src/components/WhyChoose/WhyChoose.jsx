import "./whyChoose.css";
import {
  FaShieldAlt,
  FaUsers,
  FaBolt,
  FaGift,
  FaGlobeAsia,
  FaChartLine,
} from "react-icons/fa";
function WhyChoose() {

    const features = [
{
    icon:<FaShieldAlt />,
    title:"Secure Platform",
    text:"Built with a secure and reliable digital infrastructure."
},

        {
    icon:<FaUsers />,
    title:"Smart Community",
    text:"Connect with a growing community and build together."
},

        {
    icon:<FaBolt />,
    title:"Fast Registration",
    text:"Simple onboarding with a smooth user experience."
},


        {
    icon:<FaGift />,
    title:"Reward System",
    text:"Designed to encourage participation and long-term growth."
},

        {
    icon:<FaGlobeAsia />,
    title:"Global Vision",
    text:"Created with a vision to connect communities worldwide."
},

         {
    icon:<FaChartLine />,
    title:"Future Ready",
    text:"Scalable technology built for future expansion."
},

    ];

    return (

        <section className="why-choose">

            <div className="container">

                <div className="why-header">

                    <span>
                        WHY CHOOSE US
                    </span>

                    <h2>
                        Why Choose
                        <br />
                        ZORY GLOBAL
                    </h2>

                    <p>
                        A modern technology platform focused on community,
                        innovation and long-term digital growth.
                    </p>

                </div>

                <div className="why-grid">

                    {
                        features.map((item,index)=>(

                            <div className="why-card" key={index}>

                                <div className="why-icon">
                                    {item.icon}
                                </div>

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {item.text}
                                </p>

                            </div>

                        ))
                    }

                </div>

            </div>

        </section>

    );

}

export default WhyChoose;