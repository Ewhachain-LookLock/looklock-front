import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return (
        <>
        <footer id="footer">
            {/* Upper Box */}
            <div class='upper-box'>
                {/* Left Side - Logo */}
                <div class='left-box'>
                    <div class='logo' id='footer-logo'>
                        <Link to="/">
                            <img src={require("../Assets/header-logo.png")} alt="Looklock logo"/>
                        </Link>
                    </div>
                </div>
                <div class='right-box'>
                    {/* Right Side - Sections */}
                    <div class='link-box'>
                        <ul id="links-left">
                            <li id='link-lockdrop'>
                                <Link to="/">Lockdrop</Link>
                            </li>
                            <li>
                                <Link to="/project">Project</Link>
                            </li>
                            <li>
                                <Link to="/swap">Swap</Link>
                            </li>
                            <li>
                                <Link to="/swap">Help</Link>
                            </li>
                        </ul>
                        <ul id="links-right">
                            <li id='link-partner'>
                                <Link to="/partner">Partner</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/admin">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Lower Box */}
            <div class='lower-box'>
                <div class='left-box'>
                    {/* Left Side */}
                    <div id='corporation'>
                        © LOOKLOCK. 2022. 
                    </div>
                </div>
                <div class='right-box'>
                    {/* Right Side */}
                    <div>
                        <ul id='contact-links'>
                            <li id='contact-us'>
                                Contact us:
                            </li>
                            <li>
                                Twitter
                            </li>
                            <li>
                                Discord
                            </li>
                            <li>
                                Telegram
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            

            
        </footer>
        <Outlet/>
        </>
    )
};

export default Footer;