import Footer from '../component/Footer';
import './Register.css';
import React, { useState } from "react";

const Register = () => {
    return (
      <body>
        <div class='register-container d-flex flex-column'>
          <div class='go-back'></div>
          {/* 1. about project */}
          <div class='about-project-wrapper register-wrapper d-flex flex-column justify-content-center'>
            <h1>1. Tell about your project</h1>
            <div class='project-info d-inline-flex flex-row'>
              <div class='project-name'>
                <div class='register-txt'>
                  Project name
                </div>
                Input
              </div>
              <div class='project-logo'>
                <div class='register-txt'>
                  Project's logo image
                </div>
                <div class='logo-img d-flex flex-row'>
                Input
                  <button>Upload</button>
                </div>
              </div>
            </div>
            
            <div class='project-category'>
              <div class='register-txt'>Category</div>
              Input
            </div>
            <div class='project-explain'>
              <div class='register-txt'>Project explanation</div>
              Input
            </div>
          </div>
          {/* end of 1. about project */}
          {/* 2. about token rewards */}
          <div class='token-rewards-wrapper register-wrapper d-flex flex-column'>
            <h1>2. Tell about your token rewards plan</h1>
            <div class='token-name'></div>
            <div class='token-address'></div>
            <div class='total-token-rewards'>
              <div class='token-rewards-chart'>표</div>
            </div>

          </div>
          {/* end of 2. about token rewards */}
          {/* 3. about lockdrop period */}
          <div class='lockdrop-period-wrapper register-wrapper d-flex flex-column'>
            <h1> 3. Tell about lockdrop period </h1>
            <div class='lockdrop-details d-flex flex-column'>
              <div class='total-lockdrop-period d-inline-flex'></div>
              <div class='phase1-period d-inline-flex'></div>
              <div class='phase2-period d-inline-flex'></div>
            </div>
            <div class='withdraw-details-wrapper d-flex'>
              <div class='withdraw-details d-inline-flex'>

              </div>
            </div>
          </div>
          {/* end of 3. about lockdrop period */}
          <div class='lockdrop-register'>
            <button class="purple-gradient-btn" type="button" id="register-btn">
              Register
            </button>
          </div>
        </div>
        <Footer/>
      </body>
    )
  };
  
  export default Register;