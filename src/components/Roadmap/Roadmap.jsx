import "./roadmap.css";

function Roadmap() {

    const roadmap = [

        {
            year: "2026",
            title: "Platform Launch",
            points: [
                "ZORY GLOBAL Launch",
                "Community Growth"
            ]
        },

        {
            year: "2027",
            title: "Blockchain Expansion",
            points: [
                "ZORY Token",
                "ZORY Wallet"
            ]
        },

        {
            year: "2028",
            title: "Energy Ecosystem",
            points: [
                "Solar Ecosystem",
                "Mobile App"
            ]
        },

        {
            year: "2029",
            title: "Global Vision",
            points: [
                "ZORY Exchange",
                "Global Expansion"
            ]
        }

    ];

    return (

        <section className="roadmap" id="roadmap">

            <div className="container">

                <div className="roadmap-header">

                    <span>
                        ROADMAP
                    </span>

                    <h2>
                        Our Growth
                        <br />
                        Journey
                    </h2>

                    <p>
                        Discover our long-term vision and roadmap
                        for building the ZORY GLOBAL ecosystem.
                    </p>

                </div>

                <div className="roadmap-grid">

                    {
                        roadmap.map((item, index) => (

                            <div
                                className="roadmap-card"
                                key={index}
                            >

                                <div className="roadmap-year">
                                    {item.year}
                                </div>

                                <h3>
                                    {item.title}
                                </h3>

                                <ul>

                                    {
                                        item.points.map((point, i) => (

                                            <li key={i}>
                                                {point}
                                            </li>

                                        ))
                                    }

                                </ul>

                            </div>

                        ))
                    }

                </div>

            </div>

        </section>

    );

}

export default Roadmap;