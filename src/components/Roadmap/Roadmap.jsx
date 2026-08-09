import "./roadmap.css";

function Roadmap() {
    const roadmap = [
        {
            year: "2026",
            phase: "PHASE 01",
            title: "Platform & Web3 Foundation",
            points: [
                "ZORY GLOBAL Platform Launch",
                "Community Growth",
                "Web3 Integration",
                "ZORY NFT Collection — Coming Soon"
            ]
        },

        {
            year: "2027",
            phase: "PHASE 02",
            title: "Token & Wallet",
            points: [
                "ZORY Token Launch",
                "ZORY Wallet",
                "Token Ecosystem",
                "NFT Utility Integration"
            ]
        },

        {
            year: "2028",
            phase: "PHASE 03",
            title: "Energy Ecosystem",
            points: [
                "Solar Ecosystem",
                "Energy Products",
                "Mobile App",
                "Community Utility"
            ]
        },

        {
            year: "2029",
            phase: "PHASE 04",
            title: "Global Expansion",
            points: [
                "ZORY Exchange",
                "Global Community",
                "International Expansion",
                "Complete ZORY Ecosystem"
            ]
        }
    ];

    return (
        <section className="roadmap" id="roadmap">

            <div className="container">

                {/* Roadmap Header */}
                <div className="roadmap-header">

                    <span className="roadmap-label">
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

                {/* Roadmap Timeline */}
                <div className="roadmap-grid">

                    {roadmap.map((item, index) => (

                        <div
                            className="roadmap-card"
                            key={index}
                        >

                            <div className="roadmap-card-top">

                                <span className="roadmap-phase">
                                    {item.phase}
                                </span>

                                <div className="roadmap-year">
                                    {item.year}
                                </div>

                            </div>

                            <h3>
                                {item.title}
                            </h3>

                            <div className="roadmap-line"></div>

                            <ul>

                                {item.points.map((point, i) => (

                                    <li key={i}>
                                        <span className="roadmap-dot"></span>
                                        <span>{point}</span>
                                    </li>

                                ))}

                            </ul>

                        </div>

                    ))}

                </div>

                {/* Roadmap Bottom Message */}
                <div className="roadmap-bottom">

                    <span className="roadmap-bottom-line"></span>

                    <span>
                        BUILDING THE FUTURE OF ZORY GLOBAL
                    </span>

                    <span className="roadmap-bottom-line"></span>

                </div>

            </div>

        </section>
    );
}

export default Roadmap;