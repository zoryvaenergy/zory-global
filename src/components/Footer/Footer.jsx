import "./footer.css";

function Footer() {

    const quickLinks = [

        "Home",
        "Roadmap",
        "Tokenomics",
        "Login",
        "Register"

    ];

    const platform = [

        "Community",
        "Blockchain",
        "Rewards",
        "Energy"

    ];

    const social = [

        "Telegram",
        "Twitter",
        "Discord",
        "Instagram"

    ];

    return (

        <footer className="footer">

            <div className="container">

                <div className="footer-grid">

                    <div className="footer-brand">

                        <h2>

                            ZORY GLOBAL

                        </h2>

                        <p>

                            Building the future through community,
                            blockchain technology and renewable energy.

                        </p>

                    </div>

                    <div>

                        <h3>Quick Links</h3>

                        <ul>

                            {
                                quickLinks.map((item,index)=>(

                                    <li key={index}>

                                        {item}

                                    </li>

                                ))
                            }

                        </ul>

                    </div>

                    <div>

                        <h3>Platform</h3>

                        <ul>

                            {
                                platform.map((item,index)=>(

                                    <li key={index}>

                                        {item}

                                    </li>

                                ))
                            }

                        </ul>

                    </div>

                    <div>

                        <h3>Social</h3>

                        <ul>

                            {
                                social.map((item,index)=>(

                                    <li key={index}>

                                        {item}

                                    </li>

                                ))
                            }

                        </ul>

                    </div>

                </div>

                <div className="footer-bottom">

                    © 2026 ZORY GLOBAL. All Rights Reserved.

                </div>

            </div>

        </footer>

    );

}

export default Footer;