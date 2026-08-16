import React, { useEffect, useState } from "react";
import "./LaunchComingSoon.css";

const LAUNCH_DATE = new Date(
  "2026-09-19T00:00:00+05:30"
).getTime();

function LaunchComingSoon() {

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [launched, setLaunched] = useState(false);

  // =========================
  // LIVE COUNTDOWN
  // =========================

  useEffect(() => {

    const calculateTime = () => {

      const difference =
        LAUNCH_DATE - Date.now();

      if (difference <= 0) {

        setLaunched(true);

        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      const days = Math.floor(
        difference /
          (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference /
          (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference /
          (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    calculateTime();

    const timer = setInterval(
      calculateTime,
      1000
    );

    return () => clearInterval(timer);

  }, []);

  // =========================
  // NUMBER FORMAT
  // =========================

  const formatNumber = (number) =>
    String(number).padStart(2, "0");

  return (

    <main className="launch-page">

      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="launch-grid" />

      <div className="launch-glow glow-one" />
      <div className="launch-glow glow-two" />


      {/* =========================
          HEADER
      ========================= */}

      <header className="launch-header">

        <div className="launch-logo">

          <div className="logo-symbol">
            Z
          </div>

          <div>

            <strong>
              ZORY
            </strong>

            <span>
              GLOBAL
            </span>

          </div>

        </div>

        <div className="launch-badge">
          ● COMMUNITY LAUNCH
        </div>

      </header>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <section className="launch-content">


        {/* =========================
            LEFT CONTENT
        ========================= */}

        <div className="launch-left">

          <span className="launch-eyebrow">
            THE NEXT WEB3 COMMUNITY
          </span>


          <h1>

            The Future of

            <span>
              ZORY GLOBAL
            </span>

          </h1>


          <p className="launch-description">

            A new generation community
            built around Web3, Blockchain,
            NFTs and the ZORY ecosystem.

          </p>


          {/* =====================
              WEB3 FEATURES
          ===================== */}

          <div className="web3-features">

            <div>
              <span>⛓</span>
              <strong>
                Blockchain
              </strong>
            </div>

            <div>
              <span>◉</span>
              <strong>
                ZORY Token
              </strong>
            </div>

            <div>
              <span>💎</span>
              <strong>
                NFT
              </strong>
            </div>

            <div>
              <span>🌐</span>
              <strong>
                Web3
              </strong>
            </div>

          </div>


          {/* =====================
              COMMUNITY BUTTON
          ===================== */}

          <a
  className="community-button"
  href="https://t.me/globalzory"
  target="_blank"
  rel="noopener noreferrer"
>
  Join ZORY Community
  <span>→</span>
</a>

        </div>


        {/* =========================
            COUNTDOWN CARD
        ========================= */}

        <div className="launch-card">

          <div className="card-top-line">

            <span>
              ZORY GLOBAL
            </span>

            <span>
              LIVE COUNTDOWN
            </span>

          </div>


          {launched ? (

            /* =====================
               LAUNCHED STATE
            ===================== */

            <div className="launched-message">

              <div className="launch-icon">
                Z
              </div>

              <h2>
                ZORY GLOBAL
              </h2>

              <h3>
                IS LIVE
              </h3>

              <p>
                Welcome to the next
                generation of Web3.
              </p>

            </div>

          ) : (

            <>

              <h2>

                ZORY GLOBAL

                <br />

                <span>
                  Launching Soon
                </span>

              </h2>


              <p className="countdown-subtitle">
                The countdown has begun
              </p>


              {/* =====================
                  COUNTDOWN
              ===================== */}

              <div className="countdown">

                <div className="time-box">

                  <strong>
                    {formatNumber(
                      timeLeft.days
                    )}
                  </strong>

                  <span>
                    Days
                  </span>

                </div>


                <div className="time-box">

                  <strong>
                    {formatNumber(
                      timeLeft.hours
                    )}
                  </strong>

                  <span>
                    Hours
                  </span>

                </div>


                <div className="time-box">

                  <strong>
                    {formatNumber(
                      timeLeft.minutes
                    )}
                  </strong>

                  <span>
                    Minutes
                  </span>

                </div>


                <div className="time-box">

                  <strong>
                    {formatNumber(
                      timeLeft.seconds
                    )}
                  </strong>

                  <span>
                    Seconds
                  </span>

                </div>

              </div>


              {/* =========================
                  CENTRAL ZORY COIN
              ========================= */}

              <div className="zory-coin-stage">

                <div className="coin-orbit orbit-one" />

                <div className="coin-orbit orbit-two" />

                <div className="zory-coin-glow" />


                <div className="zory-coin">

                  {/* COIN EDGE */}

                  <div className="coin-edge" />


                  {/* FRONT FACE */}

                  <div className="coin-face coin-front">

                    <div className="coin-ring">

                      <span>
                        Z
                      </span>

                    </div>

                    <small>
                      ZORY
                    </small>

                  </div>


                  {/* BACK FACE */}

                  <div className="coin-face coin-back">

                    <div className="coin-ring">

                      <span>
                        Z
                      </span>

                    </div>

                    <small>
                      ZORY
                    </small>

                  </div>

                </div>

              </div>


             {/* =====================
    ZORY TOKEN INFO
===================== */}

<div className="zory-token-info">

  <div className="token-info-icon">
    <div className="token-info-z">
      Z
    </div>
  </div>

  <div className="token-info-content">

    <small>
      ZORY TOKEN
    </small>

    <strong>
      Powering the ZORY Ecosystem
    </strong>

    <span>
      Built for the community, Web3
      and the future of digital assets.
    </span>

  </div>

</div>

              {/* =====================
                  JOIN COMMUNITY
              ===================== */}

              <a
  className="waitlist-button"
  href="https://t.me/globalzory"
  target="_blank"
  rel="noopener noreferrer"
>
  Join Community
</a>

            </>

          )}

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="launch-footer">

        <span>
          WEB3
        </span>

        <span>
          •
        </span>

        <span>
          BLOCKCHAIN
        </span>

        <span>
          •
        </span>

        <span>
          NFT
        </span>

        <span>
          •
        </span>

        <span>
          ZORY TOKEN
        </span>

      </footer>

    </main>

  );

}

export default LaunchComingSoon;