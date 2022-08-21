import Footer from '../components/Footer';
import Register from '../components/Register';
import './Partner.css';
import { Link } from "react-router-dom";

const Partner = ({currentAccount}) => {
  return (
    <body>
      <div id='partner-wrapper'>
        <div id='partner-title-wrapper'>
          <h1 id='partner-title'>
            Look and Lock.<br/>
            Your chances are all here.
          </h1>
          <p>
          LookLock is an aggregator platform to make it easy to approach 
          all lockdrop projects in Polygon ecosystem.<br/>
          If you launch your lockdrop event for your new project, 
          we’ll sure our LookLock platform is the best place. 
          </p>
          <p>
          Examples of which features are powered by LookLock include:
          </p>
          <ul id='partner-ex-ul'>
            <li>Grasping all lockdrop projects at a glance.</li>
            <li>Simplifying the lockdrop procedure</li>
            <li>Expose new projects to users interested in Lockdrop</li>
          </ul>
          <button id='go-to-register-btn'>
            <Link to="/register">Go To Register</Link>
          </button>
        </div>
        <div id='partner-guideline-wrapper'>
          <h3>Guideline</h3>
          <div id='partner-guideline-container'>
            <div class='flex-container'>
              <div class='partner-flex-item-left' id='partner-benefit'>Benefit</div>
              <div class='partner-flex-item-right' id='partner-benefit-cont'>
                <p>
                If you have a plan to launch a lockdrop event for your new project, we’ll sure our LookLock platform is the best place for you.<br/><br/>
                You can promote your projects to people who are interested in and willing to participate in Lockdrop projects.<br/><br/>
                With us, you can save time and cost to build a system for your lockdrop projects when you launch them in your own website.<br/><br/>
                Launch and boost your Lockdrop project on LookLock!
                </p>
              </div>
            </div>
            <div class='flex-container'>
              <div class='partner-flex-item-left'>Requirement</div>
              <div class='partner-flex-item-cont partner-flex-item-right'>
                <p>
                Your project should include LOLO token as lockable token.<br/>
                If you use only LOLO token in a project, there would be no platform using fee<br/>
                For launching on LookLock, projects need to make some decisions below:<br/>
                </p>
                <ul class='requirement-ul'>
                  <li>Type of token that you want to lock up</li>
                  <li>Total token rewards for lockdrop</li>
                  <li>Lockdrop Period</li>
                  <li>phase 1 (period when investor can deposit & witdraw freely) </li>
                  <li>phase 2 (period when investor can witdraw only)</li>
                  <li>withdrawable percentage for specific periods in phase 2</li>
                  <li>Cliff Period </li>
                  <li>Rewards multiplier of each cliff period</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </body>
  )  };
  
  export default Partner;