import Footer from '../components/Footer';
import './Register.css';
import React, { useState, useMemo, setState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select, { default as ReactSelect, components } from 'react-select';
// import Table from '../components/Table.js';
import SelectCategory from '../components/Register/SelectCategory';
import makeAnimated from "react-select/animated";
import { ConstructorFragment } from 'ethers/lib/utils';

  // project category
  const projectCategories = [
    {value:"default", label: "Pick a Category", id: null},
    {value:"defi", label: "DeFi", id: 1},
    {value:"nft", label: "NFT", id: 2},
    {value:"tooling", label: "Tooling", id: 3},
    {value:"infrastructure", label: "Infrastructure", id: 4},
    {value:"gaming", label: "Gaming", id: 5},
    {value:"public-goods", label: "Public Goods", id: 6},
  ];

  const Option = (props) => {
    const [isSelected, setIsSelected] = useState('');
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => null}
          />{" "}
          <label>{projectCategories.label}</label>
        </components.Option>
      </div>
    );
  };
  
  const allOption = {
    label: "Select all",
    value: "*"
  };
  
  const ValueContainer = ({ children, ...props }) => {
    const currentValues = props.getValue();
    let toBeRendered = children;
    if (currentValues.some(val => val.value === allOption.value)) {
      toBeRendered = [[children[0][0]], children[1]];
    }
  
    return (
      <components.ValueContainer {...props}>
        {toBeRendered}
      </components.ValueContainer>
    );
  };
  
  const MultiValue = props => {
    let labelToBeDisplayed = `${props.data.label}, `;
    if (props.data.value === allOption.value) {
      labelToBeDisplayed = "All is selected";
    }
    return (
      <components.MultiValue {...props}>
        <span>{labelToBeDisplayed}</span>
      </components.MultiValue>
    );
  };

  const animatedComponents = makeAnimated();

  // "title": "Look",
  // "information": ":Information about project ~!~", 
  // "rewards": [{"days": 30, "boost":1},{"days": 60, "boost":2},{"days": 90, "boost":3},{"days": 120, "boost":4} ] ,
  // "startDate": "2022-07-01",
  // "phase1period": 30,
  // "phase2periods": [{"days": 30, "percent":30},{"days": 60, "percent":10} ] 

const Register = () => {
  const [projectInfo, setProjectInfo] = useState({
    title : "",
    tokenName : "",
    information: "",
    category : "",
    startDate : null
  })
  const [image, setImage] = useState();
  const [tokenContract, setTokenContract] = useState("");

  const [rewards, setRewards] = useState([{
    period : 0,
    multiplier : 0,
    allocation : 0
  }])
  const [phase2, setPhase2] = useState([{
    period : 0,
    percent : 0
  }])

  const [inputs, setInputs] = useState('');

  useEffect(()=> {
    console.log("rewards: " ,rewards[0].period);
  }, [])
  const onProjectInfoChange = (e) => setProjectInfo(prevInfo => ({ ...prevInfo, [e.target.name]: e.target.value }) )
  const onTokenContractChange = (e) => setTokenContract(e.target.value);

  // project category multiselect
  const handleChange = selected => {
    setOptionSelected('selected');
  };
  const [optionSelected, setOptionSelected] = useState('');

  const onChange = (e)=>{
    setInputs(e.target.value);
  };  

  const [files, setFiles] = useState('');
  const onLoadFile = (e) => {
    const file = e.target.files;
    console.log(file);
    setFiles(file);
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
                <span class='dropdown-category' data-toggle='pop-over' data-trigger="focus" data-content="Please select category(s)">
                  <SelectCategory
                    options={projectCategories}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                      MultiValue,
                      ValueContainer,
                      animatedComponents
                    }}
                    onChange={handleChange}
                    allowSelectAll={true}
                    value={optionSelected}
                  />
                </span>
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
              <div class='token-rewards-table'>
                1234
                <table>
                {rewards.map((data, index) => {
                    // lockdrop periods
                    console.log(data.period);
                    return(
                    <tr>
                      <td>
                        <input type="text" name="period" value={data.period}></input>
                      </td>
                      <td>1</td>
                      <td>2</td>
                    </tr> )
                })}
                </table>
        
                
                
                {/* <Table rows={rows} data={tableData} /> */}
                <div class='register-comment add-table add-more'>add more..</div> 
                {/* add more하면 onClick으로 세트 하나 더 생성 (...기존, new)   */}
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