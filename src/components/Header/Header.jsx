import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (

        <header className="header">

            <div className="logo">

                ZORY <span>GLOBAL</span>

            </div>

            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
            >

                ☰

            </button>

            <nav className={`nav-links ${menuOpen ? "active" : ""}`}>

                <Link
                    to="/"
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                >
                    Home
                </Link>

                <a
                    href="#roadmap"
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                >
                    Roadmap
                </a>

                <a
                    href="#tokenomics"
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                >
                    Tokenomics
                </a>

                <Link
                    to="/login"
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="register-btn"
                    onClick={() => setMenuOpen(false)}
                >
                    Register
                </Link>

            </nav>

        </header>

    );

}

export default Header;