import {useState} from 'react';
import Footer from '../components/Footer';
import './About.css';


const About = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    // async function connectAccount(){
    //     if (window.ethereum) {
    //         const accounts = await window.ethereum.request({
    //             method: "eth_requestAccounts",
    //         });
    //         setAccounts(accounts);
    //     }
    // }

    return (
        <body>
            <div class='about-wrapper'>
                {/* About us */}    
                <div class='about-intro'>
                    <h3 id='about'>About us</h3>
                    <h1 class='text text60' id='about-title'>
                        Look and Lock.<br/> 
                        Your chances are all here.
                    </h1>  
                    <div class='text text24' id='about-p'>
                    LookLock is an aggregator platform to make it easy to approach<br/> 
                    all lockdrop projects in Polygon ecosystem.<br/>
                    If you launch your lockdrop event for your new project,<br/> 
                    we’ll sure our LookLock platform is the best place. 
                    </div>
                    <div class='text text16' id='about-ex'>
                        Examples of which features are powered by LookLock include:
                        <ul>
                            <li>Grasping all lockdrop projects at a glance.</li>
                            <li>Simplifying the lockdrop procedure</li>
                            <li>Expose new projects to users interested in Lockdrop</li>
                        </ul>
                    </div>
                </div>
                <div class='about-lolo-intro'>
                    <h2 class='text text50'>What is LOLO?</h2>
                    <div class='text text24' id='lolo-p'>
                    LOLO is LookLock’s own Token for participating Lockdrop projects.<br/>
                    It is set as the default lockup token for all projects.
                    </div>
                    <div class='text text20' id='lolo-ex'>
                        Choose whether to use it or not:<br/>
                        ㆍIf you use LOLO token for projcets, platform using fee is to be exempted.
                    </div>
                </div>
                {/* LOLO */}
                <div class='ratio-container'>
                    <div class='ratio-wrapper'>
                        <span class='text text-gray text20' id='ratio-header'>Current Ratio</span>
                        <div id='lolo-containter'>
                                <span class='text text70'>1 LOLO</span>
                                <span class='text text70'> = </span>
                                <span class='text text70'>1.22 USD</span>
                        </div>
                        <div id='usd-container'>
                        <span class='text text-gray text22'>8,092,433 LOLO</span>
                        <span class='text text-gray text22'>9,354,672 USD</span>
                        </div>
                    </div>
                </div>
                {/* Admin */}
                <div class='admin-container'>
                    <div class='admin-wrapper'>
                        <h3 class='text text36' id='admin'>Admin</h3>
                        <div class='side-textbox'>
                            <div class='text text-gray text-24 text-sidebar' id='benefit-title'>Benefit</div>
                            <div class='text text18'>
                            If you have a plan to launch a lockdrop event for your new project, we’ll sure our LookLock platform is the best place for you.<br/>
                            You can promote your projects to people who are interested in and willing to participate in Lockdrop projects.<br/>
                            With us, you can save time and cost to build a system for your lockdrop projects when you launch them in your own website.<br/>
                            Launch and boost your Lockdrop project on LookLock!
                            </div>
                        </div>
                        <div class='side-textbox'>
                            <div class='text text-gray text-24 text-sidebar'>Requirement</div>
                            <div>

                                <div class='text text18'>
                                Your project should include LOLO token as lockable token.<br/>
                                If you use only LOLO token in a project, there would be no platform using fee<br/>
                                For launching on LookLock, projects need to make some decisions below:
                                </div>
                                <div class='text text18 text-list'>
                                    <ul id='outer-ul'>
                                        <li>
                                        Type of token that you want to lock up
                                        </li>
                                        <li>
                                        Total token rewards for lockdrop
                                        </li>
                                        <li>
                                        Lockdrop Period
                                        </li>
                                            <ul id='inner-ul'>
                                                <li>
                                                    phase 1 (period when investor can deposit & witdraw freely)
                                                </li>
                                                <li>
                                                    phase 2 (period when investor can witdraw only)
                                                </li>
                                            </ul>
                                        <li>
                                            withdrawable percentage for specific periods in phase 2
                                        </li>
                                        <li>
                                            Cliff Period
                                        </li>
                                        <li>
                                            Rewards multiplier of each cliff period
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Register */}
                <div class='register-wrapper'>
                    <button class='purple-gradient-btn'>
                        Register
                    </button>
                </div>
            </div>
            <Footer />
        </body>
    )
}

export default About;