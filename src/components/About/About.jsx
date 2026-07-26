import "./about.css";

function About() {

    const features = [

        "Global Community",
        "Blockchain Innovation",
        "Renewable Energy",
        "Secure Digital Platform",
        "Long-Term Growth"

    ];

    return (

        <section className="about">

            <div className="container about-grid">

                <div className="about-left">

                    <span>
                        ABOUT ZORY GLOBAL
                    </span>

                    <h2>

                        Building The Future
                        <br />
                        Through Innovation

                    </h2>

                    <p>

                        ZORY GLOBAL is a next-generation ecosystem
                        combining community, blockchain technology
                        and renewable energy to create long-term
                        digital opportunities.

                    </p>

                    <p>

                        Our mission is to build a trusted platform
                        where technology, collaboration and
                        sustainable growth work together for
                        everyone.

                    </p>

                </div>

                <div className="about-right">

                    {
                        features.map((item,index)=>(

                            <div
                                className="about-card"
                                key={index}
                            >

                                <span className="check">

                                    ✓

                                </span>

                                <span>

                                    {item}

                                </span>

                            </div>

                        ))
                    }

                </div>

            </div>

        </section>

    );

}

export default About;