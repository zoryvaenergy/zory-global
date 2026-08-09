import "./tokenomics.css";

function Tokenomics() {
    const tokenomics = [
        {
            title: "Community Rewards",
            percent: 50,
            description: "Rewards and incentives for the ZORY GLOBAL community",
        },

        {
            title: "Company Reserve",
            percent: 20,
            description: "Long-term reserve for ecosystem sustainability",
        },

        {
            title: "Exchange Liquidity",
            percent: 15,
            description: "Liquidity support for future token ecosystem",
        },

        {
            title: "Marketing",
            percent: 10,
            description: "Global promotion and community expansion",
        },

        {
            title: "Team & Development",
            percent: 5,
            description: "Technology, development and core team",
        },
    ];

    return (
        <section className="tokenomics" id="tokenomics">

            <div className="container">

                {/* ==============================
                    HEADER
                ============================== */}

                <div className="tokenomics-header">

                    <span className="tokenomics-label">
                        TOKENOMICS
                    </span>

                    <h2>
                        Token
                        <br />
                        Distribution
                    </h2>

                    <p>
                        A transparent allocation model designed to support
                        long-term ecosystem growth and community development.
                    </p>

                </div>

                {/* ==============================
                    TOTAL ALLOCATION
                ============================== */}

                <div className="token-total">

                    <div className="token-total-glow"></div>

                    <span className="token-total-label">
                        TOTAL ALLOCATION
                    </span>

                    <strong>
                        100%
                    </strong>

                    <p>
                        ZORY Token Distribution
                    </p>

                </div>

                {/* ==============================
                    TOKEN DISTRIBUTION
                ============================== */}

                <div className="tokenomics-list">

                    {tokenomics.map((item, index) => (

                        <div
                            className="token-card"
                            key={index}
                        >

                            <div className="token-card-icon">
                                {String(index + 1).padStart(2, "0")}
                            </div>

                            <div className="token-card-content">

                                <div className="token-top">

                                    <div>

                                        <h3>
                                            {item.title}
                                        </h3>

                                        <p>
                                            {item.description}
                                        </p>

                                    </div>

                                    <span className="token-percent">
                                        {item.percent}%
                                    </span>

                                </div>

                                <div className="progress">

                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${item.percent}%`
                                        }}
                                    ></div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* ==============================
                    BOTTOM MESSAGE
                ============================== */}

                <div className="tokenomics-bottom">

                    <span></span>

                    <p>
                        BUILT FOR LONG-TERM ECOSYSTEM GROWTH
                    </p>

                    <span></span>

                </div>

            </div>

        </section>
    );
}

export default Tokenomics;