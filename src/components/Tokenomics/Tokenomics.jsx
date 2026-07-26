import "./tokenomics.css";

function Tokenomics() {

    const tokenomics = [

        {
            title: "Community Rewards",
            percent: 50
        },

        {
            title: "Company Reserve",
            percent: 20
        },

        {
            title: "Exchange Liquidity",
            percent: 15
        },

        {
            title: "Marketing",
            percent: 10
        },

        {
            title: "Team & Development",
            percent: 5
        }

    ];

    return (

        <section className="tokenomics" id="tokenomics">

            <div className="container">

                <div className="tokenomics-header">

                    <span>
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

                <div className="tokenomics-list">

                    {
                        tokenomics.map((item, index) => (

                            <div
                                className="token-card"
                                key={index}
                            >

                                <div className="token-top">

                                    <h3>
                                        {item.title}
                                    </h3>

                                    <span>
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

                        ))
                    }

                </div>

            </div>

        </section>

    );

}

export default Tokenomics;