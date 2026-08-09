import {
  FaGem,
  FaShieldAlt,
  FaUsers,
  FaStar,
} from "react-icons/fa";

import "./nftComingSoon.css";

function NFTComingSoon() {
  return (
    <section className="nft-coming-soon">

      <div className="nft-main-card">

        {/* =========================
            NFT VISUAL
        ========================== */}

        <div className="nft-visual">

          <div className="nft-glow"></div>

          <div className="nft-platform">

            <div className="nft-card">

              <div className="nft-card-title">
                ZORY
              </div>

              <div className="nft-card-nft">
                NFT
              </div>

              <div className="nft-card-brand">
                ZORY GLOBAL
              </div>

              <div className="nft-symbol">
                Z
              </div>

              <div className="nft-card-bottom">
                DIGITAL COLLECTIBLE
              </div>

              <div className="nft-card-number">
                COMING SOON
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            NFT CONTENT
        ========================== */}

        <div className="nft-content">

          <span className="nft-badge">
            WEB3 COLLECTION
          </span>

          <h2>
            ZORY <span>NFT</span>
          </h2>

          <h3>
            Own the <span>Future.</span> Own ZORY.
          </h3>

          <div className="nft-line"></div>

          <p className="nft-description-main">
            Exclusive ZORY GLOBAL digital collectibles
            designed for our community and the future
            we build together.
          </p>

          <div className="nft-coming-label">
            COMING SOON
          </div>

          <p className="nft-description-small">
            Our NFT collection is currently under development.
            Stay connected for the official launch.
          </p>

        </div>


        {/* =========================
            NFT FEATURES
        ========================== */}

        <div className="nft-features">

          <div className="nft-feature">

            <div className="nft-feature-icon">
              <FaGem />
            </div>

            <div>
              <h4>LIMITED EDITION</h4>
              <p>
                Exclusive digital collectibles
              </p>
            </div>

          </div>


          <div className="nft-feature">

            <div className="nft-feature-icon">
              <FaShieldAlt />
            </div>

            <div>
              <h4>VERIFIED & SECURE</h4>
              <p>
                Blockchain based digital assets
              </p>
            </div>

          </div>


          <div className="nft-feature">

            <div className="nft-feature-icon">
              <FaUsers />
            </div>

            <div>
              <h4>COMMUNITY FIRST</h4>
              <p>
                Built for the ZORY GLOBAL community
              </p>
            </div>

          </div>


          <div className="nft-feature">

            <div className="nft-feature-icon">
              <FaStar />
            </div>

            <div>
              <h4>UTILITY & REWARDS</h4>
              <p>
                Future benefits for NFT holders
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* =========================
          BOTTOM TEXT
      ========================== */}

      <div className="nft-future-line">
        <span></span>

        <strong>
          BE PART OF THE FUTURE
        </strong>

        <span></span>
      </div>

    </section>
  );
}

export default NFTComingSoon;