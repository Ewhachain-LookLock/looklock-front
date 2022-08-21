import Footer from '../components/Footer';
import './Register.css';
import React, { useState, useReducer, useEffect} from "react";
import { Link } from "react-router-dom";
import Select, { default as ReactSelect, components } from 'react-select';
import axios from "axios";
import reducer from "../utils/reducer";


//base server url
const BASE_URL = "https://looklock-backend.herokuapp.com";
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

  // "title": "Look",
  // "information": ":Information about project ~!~", 
  // "rewards": [{"days": 30, "boost":1},{"days": 60, "boost":2},{"days": 90, "boost":3},{"days": 120, "boost":4} ] ,
  // "startDate": "2022-07-01",
  // "phase1period": 30,
  // "phase2periods": [{"days": 30, "percent":30},{"days": 60, "percent":10} ] 

const Register = ({currentAccount}) => {

  const [projectInfo, setProjectInfo] = useState({
    title : "",
    tokenName : "",
    information: "",
    category : "",
    startDate : null
  })
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const [tokenContract, setTokenContract] = useState("");

  const [rewards, setRewards] = useState([{
    period : 0,
    multiplier : 1,
    allocation : 2
    }]
  )

  const [owner, setOwner] = useState('');

  const onRewardChange = (index, target) => e => {
    let newArr = [...rewards];
    newArr[index][target] = Number(e.target.value);
    setRewards(newArr);
  }

  const onPhase2Change = (index, target) => e => {
    let newArr = [...phase2];
    newArr[index][target] = Number(e.target.value);
    setPhase2(newArr);
  }


  const [phase1Period, setPhase1Period] = useState("");
  const onPhase1PeriodChange = (e) => setPhase1Period(Number(e.target.value));
  const [phase2Period, setPhase2Period] = useState("");
  const onPhase2PeriodChange = (e) => setPhase2Period(Number(e.target.value));
  const [files, setFiles] = useState();
  const [phase2, setPhase2] = useState([{
    period : 0,
    percent : 0
  }]);

  useEffect(() => {
    setOwner(currentAccount);
    }, [currentAccount]);

  const [state, dispatch] = useReducer(reducer, {
    loading : false,
    data : null,
    error : null
  });

  const onLoadFile = (e) => {
    const file = e.target.files[0];
    console.log("check" , file);
    setFiles(file);
  };

  const onProjectInfoChange = (e) => setProjectInfo(prevInfo => ({ ...prevInfo, [e.target.name]: e.target.value }) )
  const onTokenContractChange = (e) => setTokenContract(e.target.value);

  // project category multiselect
  const handleChange = selected => {
    setOptionSelected('selected');
  };
  const [optionSelected, setOptionSelected] = useState('');

  const formatFormData = () => {
    const {title, tokenName, information, startDate} = projectInfo;
 
    const rewardArray = rewards.reduce((array, {period, multiplier}) => {
      array.push({days: period, boost: multiplier});
      return array;
    }, []);

    const phase2periodArray = phase2.reduce((array, {period, percent}) => {
      array.push({days: period, percent: percent});
      return array
    }, []);
    
    const data = {
      title : title,
      tokenName : tokenName,
      owner: currentAccount,
      information : information,
      rewards : rewardArray,
      category : category,
      startDate : startDate,
      phase1period : phase1Period,
      phase2period : phase2Period,
      phase2periods : phase2periodArray
    }

    return data;
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("projectImg", files);
    const data = formatFormData();
    formData.append("data", JSON.stringify(data));
    const json = JSON.stringify(data);
    console.log(json);
    await axios({
      method: 'post',
      url: 'https://looklock-backend.herokuapp.com/api/project',
      data: formData,
        })
      .then(res => {
        console.log(res.data);
        alert("The project is successfully uploaded");
      })
      .catch(err => {
        console.error(err);
      });

      await axios.put(`https://looklock-backend.herokuapp.com/api/user/${currentAccount}`, {
        isAdmin: true
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      })

  };


  return (

    <div>
      <form onSubmit={onSubmit}>
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
                  <input type="text" name="title" placeholder='Enter your project name' onChange={onProjectInfoChange} />
                </div>
                <div class='project-logo d-flex flex-wrap flex-column'>
                  <div class='register-txt'>
                    Project's logo image
                  </div>
                  <div class='logo-img d-flex flex-row'>
                    <label class='logo-upload' for='logoImg'>Upload</label>
                    <input type="file" name="image" id='logoImg' onChange={onLoadFile}/>
                    <p>
                    {files !== undefined ? files.name : ''}
                    </p>
          
                  </div>
                </div>
              </div>     
              <div class='project-category'>
                <div class='register-txt'>Category</div>
                <div class='register-dropdown-bar'>
                  <span class='dropdown-category' data-toggle='pop-over' data-trigger="focus" data-content="Please select category(s)">
                    <Select
                      defaultValue={''}
                      isMulti
                      name="projectCategory"
                      options={projectCategories}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(choice) => {
                        setCategory(choice.map(c => c.value));
                      }}
                    />
                  </span>
                  {/* <Select options={projectCategories} /> */}
                </div>
              </div>
              <div class='project-explain'>
                <div class='register-txt'>Project explanation</div>
                <textarea name="information" placeholder='Enter project detail explanation' onChange={onProjectInfoChange} />
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
                <input type="text" name="tokenName" placeholder='Enter token name' onChange={onProjectInfoChange} />
              </div>
              <div class='token-address'>
                <div class='register-txt'>Contract address</div>
                <input type="text" name="tokenContract" placeholder='Enter contract address' onChange={onTokenContractChange} />
              </div>
              <div class='total-token-rewards detail-wrapper'>
                <h3>Total token rewards for lockdrop</h3>
                <div class='register-txt'>Cliff Period & Rewards multiplier & Allocation of Token Rewards</div>
                <div class='token-rewards-table'>
                
                  <table>
                    <div class='token-rewards-thead'>
                      <thead>
                        Lockdrop Periods
                      </thead>
                      <thead>
                        Multipliers
                      </thead>
                      <thead>
                        Token Allocation
                      </thead>
                    </div>
                  {rewards.map((data, index) => {
                      return(
                      // Lockdrop periods
                        <tbody>
                          <tr>
                            <td>
                              <input type="text" name="period" value={data.period} onChange={onRewardChange(index, "period")}></input>
                              <label>days</label>
                            </td>                            
                          </tr>
                          <tr>
                            <td>
                              <input type="text" name="multiplier" value={data.multiplier} onChange={onRewardChange(index, "multiplier")} ></input> 
                              <label>X</label>
                            </td>                        
                          </tr>
                          <tr>
                            <td>
                              <input type="text" name="allocation" value={data.allocation} onChange={onRewardChange(index, "allocation")}></input>
                            </td>                            
                          </tr>
                        </tbody> 
                      )
                  })}
                  </table>
                  <div class='register-comment add-table add-more'>
                    <button type="button" onClick={() => setRewards([...rewards, {
                    period : 0,
                    multiplier : 1,
                    allocation : 2
                    }])}>
                    add more..</button>
                  {/* add more하면 onClick으로 세트 하나 더 생성 (...기존, new)   */}
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* end of 2. about token rewards */}
          {/* 3. about lockdrop period */}
          <div class='lockdrop-period-wrapper register-wrapper d-flex flex-column'>
            <h1> 3. Tell about lockdrop period </h1>
            <div class='lockdrop-details detail-wrapper d-flex flex-column'>
              <h3>Project Start Date</h3>
              <div class='project-start-date'>
                <input type="date" name="startDate" placeholder="YYYY/MM/DD" onChange={onProjectInfoChange} />
              </div>
              <div class='apply-period d-inline-flex'>
                <h3>Apply Period</h3>
                <div class='phase1-period d-inline-flex'>
                <div class='register-txt'>
                  <span class='phase1-txt'>Phase 1 </span> total period (Days)
                </div>
                <div class='period-form'>
                  <input type="number" name="phase1Period" onChange={onPhase1PeriodChange} /> days
                </div>
                <div class='phase1-info'>
                  물음표 + 마우스 오버 효과
                </div>
              </div>
              <div class='phase2-period d-inline-flex'>
                <div class='register-txt'>
                  <span class='phase2-txt'>Phase 2 </span> total period (Days)
                </div>
                <div class='phase2-info'>
                  물음표 + 마우스 오버 효과
                </div>
                <div class='period-form'>
                  <input type="number" name="phase2Period" onChange={onPhase2PeriodChange} /> days
                </div>
              </div>
              </div>
              
            </div>
            <div class='withdraw-details-wrapper detail-wrapper d-flex'>
              <h3>Withdrawable Percentage for Specific Periods in <span class='phase2-txt'>Phase 2</span>
              </h3>
              <div class='withdraw-detail-form d-inline-flex'>
                <table>
                  {phase2.map((data, index) => {
                    return(
                      <div class='withdraw-detail-container'>
                        <div class='withdraw-period'>
                          <label>Period (days)</label>
                          <div class='withdraw-period-detail detail-container'>
                            <input type="text" name="period" value={data.period} onChange={onPhase2Change(index, "period")}></input>
                            <label>days</label>
                          </div>
                        </div>
                        <div class='withdraw-percent detail-container'>
                          <label>Witdrawable Percentage</label>
                          <div class='withdraw-percent-detail'>
                            <input type="text" name="percent" value={data.percent} onChange={onPhase2Change(index, "percent")}></input>
                            <label>%</label>
                          </div>
                        </div>
                      </div>
                    )
                })}
                  </table>
                  {/* <Table rows={rows} data={tableData} /> */}
                  <div class='register-comment add-table add-phase2 add-more'>
                    <button type="button" onClick={() => setPhase2([...phase2, {
                    period : 0,
                    percent : 0
                    }])}>
                    add more..</button>
                  {/* add more하면 onClick으로 세트 하나 더 생성 (...기존, new)   */}
                  </div>
              </div>
            </div>
          </div>
          {/* end of 3. about lockdrop period */}
          <div class='lockdrop-register'>
            <button class="purple-gradient-btn" type="submit" id="register-btn">
              Register
            </button>
          </div>
        </div>
      </form>
      <Footer/>
    </div>
  )
};
  
export default Register;