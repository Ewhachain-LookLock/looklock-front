import Footer from '../components/Footer';
import './Register.css';
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Select from 'react-select';

const Register = () => {
  const [inputs, setInputs] = useState('');

  const onChange = (e)=>{
    setInputs(e.target.value);
  };  

  const [files, setFiles] = useState('');
  const onLoadFile = (e) => {
    const file = e.target.files;
    console.log(file);
    setFiles(file);
  }
  
  const projectCategories = [
    {value: "Pick a Category", id: null},
    {value: "DeFi", id: 1},
    {value: "NFT", id: 2},
    {value: "Tooling", id: 3},
    {value: "Infrastructure", id: 4},
    {value: "Gaming", id: 5},
    {value: "Public Goods", id: 6},
  ];

  const [selectedCategory, setSelectedCategory] = useState('Pick a Category.');
  const handleDropCategory = e => {
    const { value } = e.target;
    setSelectedCategory(projectCategories.filter(el => el.value === value)[0].id);
  }

  return (
    <body>
      <div class='register-container d-flex flex-column'>
        <div class='go-back'>
          <Link to="/admin">← Go Back</Link>
        </div>
        {/* 1. about project */}
        <div class='about-project-wrapper register-wrapper d-flex flex-column justify-content-center'>
          <h1>1. Tell about your project</h1>
          <div class='about-project'>
            <div class='project-info'>
              <div class='register-project-name d-flex flex-wrap flex-column'>
                <div class='register-txt'>
                  Project name
                </div>
                <input type="text" name="projectName" placeholder='Enter your project name' onChange={onChange} />
              </div>
              <div class='project-logo d-flex flex-wrap flex-column'>
                <div class='register-txt'>
                  Project's logo image
                </div>
                <div class='logo-img d-flex flex-row'>
                  {/* <input type="text" readonly="readonly" id="file_route"></input> */}
                  <label class='logo-upload' for='logoImg'>Upload
                  <input type="file" name="projectLogo" id='logoImg' accept='image/png, image/jpeg, image/jpg' onChange={onLoadFile}/>
                  </label>
                </div>
              </div>
            </div>     
            <div class='project-category'>
              <div class='register-txt'>Category</div>
              <div class='register-dropdown-bar'>
                <div class='dropdown-category' onChange={handleDropCategory}>
                  {projectCategories.map(el => {
                    return <option key={el.id}>{el.value}</option>;
                  })}
                </div>
                {/* <Select options={projectCategories} /> */}
              </div>
            </div>
            <div class='project-explain'>
              <div class='register-txt'>Project explanation</div>
              <textarea name="projectExplanation" placeholder='Enter project detail explanation' onChange={onChange} />
            </div>
          </div>
        </div>
        {/* end of 1. about project */}
        {/* 2. about token rewards */}
        <div class='token-rewards-wrapper register-wrapper d-flex flex-column'>
          <h1>2. Tell about your token rewards plan</h1>
          <div class='about-token-rewards'>
            <div class='token-name'>
              <div class='register-txt'>Token name</div>
              <input type="text" name="tokenName" placeholder='Enter token name' onChange={onChange} />
              <div class='register-comment'>※ not needed if you use LOLO token</div>
            </div>
            <div class='token-address'>
              <div class='register-txt'>Contract address</div>
              <input type="text" name="tokenAddress" placeholder='Enter contract address' onChange={onChange} />
              <div class='register-comment add-address add-more'>add more..</div>
            </div>
            <div class='total-token-rewards detail-wrapper'>
              <h3>Total token rewards for lockdrop</h3>
              <div class='register-txt'>Cliff Period & Rewards multiplier & Allocation of Token Rewards</div>
              <div class='token-rewards-table'>표
                <div class='register-comment add-table add-more'>add more..</div>   
              </div>
            </div>
          </div>

        </div>
        {/* end of 2. about token rewards */}
        {/* 3. about lockdrop period */}
        <div class='lockdrop-period-wrapper register-wrapper d-flex flex-column'>
          <h1> 3. Tell about lockdrop period </h1>
          <div class='lockdrop-details detail-wrapper d-flex flex-column'>
            <h3>Lockdrop Period</h3>
            <div class='total-lockdrop-period d-inline-flex'>
              <div class='register-txt'>Total Lockdrop Period</div>
              <div class='period-form'>
                dd/mm/yy~
              </div>
            </div>
            <div class='phase1-period d-inline-flex'>
              <div class='register-txt'>
                <span class='phase1-txt'>Phase 1 </span> period (Date)
              </div>
              <div class='period-form'></div>

              <div class='phase1-info'>
                물음표 + 마우스 오버 효과
              </div>
            </div>
            <div class='phase2-period d-inline-flex'>
              <div class='register-txt'>
                <span class='phase2-txt'>Phase 2 </span> period (Date)
              </div>
              <div class='phase2-info'>
                물음표 + 마우스 오버 효과
              </div>
              <div class='period-form'></div>

            </div>
          </div>
          <div class='withdraw-details-wrapper detail-wrapper d-flex'>
            <h3>Withdrawable Percentage for Specific Periods in <span class='phase2-txt'>Phase 2</span>
            </h3>
            <div class='withdraw-detail-form d-inline-flex'>

            </div>
            <div class='register-comment add-more add-withdraw'>add more..</div>
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