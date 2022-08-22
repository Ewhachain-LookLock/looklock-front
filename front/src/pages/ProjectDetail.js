import Footer from "../components/Footer";
import './ProjectDetail.css';
import Timer from '../components/Timer';
import BarGraph from '../components/BarGraph'; 
import { dateFormatter } from "../utils/dateFromatter";
import React, {useReducer, useState, useEffect} from "react";
import {useParams } from 'react-router-dom'
import axios from "axios";
import reducer from "../utils/reducer";
import Select from 'react-select';

const CustomInnerModal = ({ onRequestClose }) => {

    const [isModalOpen, setModalIsOpen] = useState(false);
	
	console.log(useState("hello")[1])

	const toggleModal = () => {
		setModalIsOpen(!isModalOpen);
	};
	// Use useEffect to add an event listener to the document
	useEffect(() => {
		function onKeyDown(event) {
			if (event.keyCode === 27) {
				// Close the modal when the Escape key is pressed
				onRequestClose();
			}
		}

		// Prevent scolling
		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", onKeyDown);

		// Clear things up when unmounting this component
		return () => {
			document.body.style.overflow = "visible";
			document.removeEventListener("keydown", onKeyDown);
		};
	});

	return (
		<div className="modal__backdrop">
			<div className="modal__container modal-success">
                <div id='modal-img-area'>
                    <img src={require("../Assets/success-confirm.png")} class='success-confirm-modal-img' alt="success img"/>
                </div>
                <div id='modal-btn-area'>
                    <button onClick={onRequestClose} class='modal-withdrawal-btn done-btn' id='custom-modal-here'>
                        Done
                    </button>
                </div>
			</div>
		</div>
	);
};

const ProjectDetail = () => {

    const [isModalOpen, setModalIsOpen] = useState(false);
	
	console.log(useState("hello")[1])
	const toggleModal = () => {
		setModalIsOpen(!isModalOpen);
	};

    const params = useParams()
    const [currentPhase, setCurrentPhase] = useState('');
    const [selectedDays, setSelectedDays] = useState(0);
    const [amounts, setAmmounts] = useState('');
    // const [phase1Due, setPhase1Due] = useState(new Date());
    // const [phase2Due, setPhase2Due] = useState(new Date());
    const [dueDate, setDueDate] = useState();

    const [rewards, setRewards] = useState('');
    const [boost, setBoost] = useState('');

    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    const handleProgressBar = () => {
        var size = '50%';
        document.documentElement.style.setProperty('--barSize', size);
    }

    const fetchProject = async () => {
        dispatch({type : 'LOADING'});
        try {
            console.log(params);
            const response = await axios.get(
                'https://looklock-backend.herokuapp.com/api/project/' +  params.id
            );
            dispatch({type:'SUCCESS', data:response.data});
            
            await setCurrentPhase(getPhase(response.data[0]))
        } catch (e) {
            console.log(error);
            dispatch({type :'ERROR', error:e})
        }
    };


    useEffect(()=> {
        fetchProject(params);
    },[]);

    const {loading, data:project, error } = state;

    const getPhase = (project) => {
        const now = new Date().getTime();
        const phase1due = getPhase1Due(project);
        let phase = ""
       
        if (now > phase1due.getTime()) {
            setDueDate(getPhase2Due(project));
            phase = "PHASE 2";
        }
        else{
            setDueDate(phase1due);
            phase = "PHASE 1"
        }
        
        return phase;

    };

    const getPhase1Due= (project) => {
        const endDate = new Date(project.startDate);
        endDate.setDate(endDate.getDate() + Number(project.phase1period));
        return endDate;
    }
    
    const getPhase1Period = (project) => {
        const startDate =  new Date(project.startDate);
        const endDate = getPhase1Due(project);
        // const endDate = new Date(project.startDate);
        // endDate.setDate(endDate.getDate() + Number(project.phase1period));
        //setPhase1Due(endDate);
        
        return dateFormatter(startDate)+ '~' + dateFormatter(endDate);
    };

    const getPhase2Due = (project)=> {
        const startDate =  new Date(project.startDate);
        startDate.setDate(startDate.getDate() +( Number(project.phase1period) +1));
        const sum = project.phase2periods.reduce((partialsum, item) => partialsum + item.days, 0);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + sum);

        return endDate;
    }

    const getPhase2Period =(project) => {
        // const startDate =  new Date(project.startDate);
        // startDate.setDate(startDate.getDate() +( Number(project.phase1period) +1));
        // const sum = project.phase2periods.reduce((partialsum, item) => partialsum + item.days, 0);
        // const endDate = new Date(startDate);
        // endDate.setDate(endDate.getDate() + sum);
        const startDate =getPhase1Due(project);
        startDate.setDate(startDate.getDate() +1);
        const endDate = getPhase2Due(project);
        //setPhase2Due(endDate);
        return dateFormatter(startDate)+ '~' + dateFormatter(endDate);
    };

    const reformatPhase2Period = (project) => {
        let result = [];
        let startDate =  new Date(project.startDate);
        startDate.setDate(startDate.getDate() +( Number(project.phase1period) +1));
        
        project.phase2periods.map((item) => {
            let endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + item.days -1);
            result.push(dateFormatter(startDate)+ ' ~ ' + dateFormatter(endDate) + ' ---------- ' + item.percent + '%');
            startDate.setDate(endDate.getDate() + 1);
        })

        return result
    }

    const handleClick = e => {
        setSelectedDays(parseInt(e.target.value));
        // console.log(selectedDays);
        if (selectedDays === 30) {
            setBoost(1);
        } else if (selectedDays === 60) {
            setBoost(3);
        }
        else if (selectedDays === 90) {
            setBoost(6);
        }
        else if (selectedDays === 120) {
            setBoost(9);
        }
    };

    const handleInput = e => {
        setAmmounts(e.target.value);
    }

    if (loading) console.log("loading..");
    if (error) return <div>요청한 데이터가 없습니다. {error.message}</div>;
    if (!project) return <div> Loading.. </div>;

    const base64String = btoa(String.fromCharCode(...new Uint8Array(project[0].projectImg.data.data)));

    return (
        <div>
            <div id='project-detail-wrapper'>
                <div id='zelo-wrapper'>
                    {/* project description section */}
                    <div id='project-name'>
                        <div>
                            {/* 이미지는 나중에 */}
                            <img id="zelo-img" src={`data:image/jpg;base64,${base64String}`} alt=""/>
                        </div>
                        <h1>{project[0].title}</h1>
                        <div>
                            <button id='phase1-btn'>{currentPhase}</button>
                            <div id='phase1-btn-blur'></div>
                        </div>
                    </div>
                    <div id='period-box'>
                        <div id='period-left'>
                            <ul>
                                <li>lockdrop apply period</li>
                                <li>lock period</li>
                                <li>allocated amount</li>
                            </ul>
                        </div>
                        <div id='period-right'>
                            <ul>
                                <li>
                                    <div id='period-phase1' class={currentPhase === "PHASE 1" ? '' : 'notyet'}>
                                        <span>Phase 1</span>
                                        <span>{getPhase1Period(project[0])}</span>
                                        <div class='dotnow'>
                                            <span class= {currentPhase === "PHASE 1" ? 'dot' : 'dot hidden'}></span>
                                            <span class={currentPhase === "PHASE 1" ? 'now' : 'now hidden-txt'}>now</span>
                                        </div>
                                    </div>
                                    <div id='period-phase2' class={currentPhase === "PHASE 2" ? '' : 'notyet'}>
                                        <span>Phase 2</span>
                                        <span>{getPhase2Period(project[0])}</span>
                                        <div class='dotnow'>
                                            <span class={currentPhase === "PHASE 2" ? 'dot' : 'dot hidden'}></span>
                                            <span class={currentPhase === "PHASE 2" ? 'now' : 'now hidden-txt'}>now</span>
                                        </div>
                                    </div>
                                </li>
                                <li>{project[0].rewards.map( (item) => 
                                    item.days + " / "
                            )} days</li>
                                {/* 총 allocated-amount :  onchain data -> register 작업 후 */}
                                <li>3,000,000,000</li>
                            </ul>
                        </div>
                    </div>

                    {/* onchain 정보 필요 --> register 작업 후*/}
                    <div id='participation-rate'>
                        <h3>Participation Rate per Days</h3>
                        <div class='outer-box'>
                            <div class='inner-box'>
                                <div class='inner-header'>
                                    <span class='part-day'>30</span>
                                    <span>days</span>  
                                </div>
                                <div class='progress-bar'></div>
                                <div class='purple-bar'></div>
                                <div class='inner-footer'>
                                    <span>700,000/100,000,000</span>
                                    <span>70%</span>
                                </div>
                            </div>
                            <div class='inner-box'>
                                <div class='inner-header'>
                                    <span class='part-day'>60</span>
                                    <span>days</span>  
                                </div>
                                <div class='progress-bar'>
                                    
                                </div>
                                <div class='purple-bar'></div>
                                <div class='inner-footer'>
                                    <span>700,000/100,000,000</span>
                                    <span>70%</span>
                                </div>
                            </div>
                        </div>
                        <div class='outer-box'>
                            <div class='inner-box'>
                                <div class='inner-header'>
                                    <span class='part-day'>90</span>
                                    <span>days</span>  
                                </div>
                                <div class='progress-bar'>
                                    
                                </div>
                                <div class='purple-bar'></div>
                                <div class='inner-footer'>
                                    <span>700,000/100,000,000</span>
                                    <span>70%</span>
                                </div>
                            </div>
                            <div class='inner-box'>
                                <div class='inner-header'>
                                    <span class='part-day'>120</span>
                                    <span>days</span>  
                                </div>
                                <div class='progress-bar'>
                                   
                                </div>
                                <div class='purple-bar'></div>
                                <div class='inner-footer'>
                                    <span>700,000/100,000,000</span>
                                    <span>70%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id='reward-wrapper'>
                        <h3>Rewards</h3>
                        <div id='reward-box'>
                            <div id='reward-header'>
                                <span>Days</span>
                                <span>Multiplier</span>
                            </div>
                            <div id='reward-body'>
                                {project[0].rewards.map( (item) => 
                                    <div class='vertical'>
                                        <span class='reward-days'>{item.days}</span>
                                        <span class='reward-multi'>{item.boost}x</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div id='lockup-wrapper'>
                    <div id='lockup-container'>
                        <div id='timer-wrapper'>
                            <Timer duedate={dueDate}/>
                            <div>
                                <span id='phase1'>{currentPhase}</span>
                                <span id='timeleft'>TIME LEFT IN THIS PHASE</span>
                            </div>
                        </div>
                        <span id='horizontal-line'>
                        </span>
                        <div id='lock-info-wrapper'>
                            <div id='amount-container'>
                                <div id='amount-text'>
                                    <span>Amount</span>
                                    <div>
                                        <span>In wallet: </span>
                                        {/* data from wallet */}
                                        <span>900</span>
                                    </div>
                                </div>
                                <div id='amount-input-container'>
                                    <span>LOLO</span>
                                    <div class='flex-right'>
                                        <input type='text' name='amount-area' placeholder="0" value={amounts} onChange={handleInput} id='amount-input-area'></input>
                                        <span>MAX</span>
                                    </div>
                                </div>
                                <span class='hidden-txt'>Minimum Amount 000</span>
                            </div>
                            <div id='duration-container'>
                                <span>Duration (days)</span>
                                <div id='duration-btn-container'>
                                    {project[0].rewards.map( (item) => 
                                    <button class={item.days===selectedDays ? 'duration-btn btnselected' : 'duration-btn'} 
                                    value = {item.days} onClick={handleClick}>{item.days}</button>
                                )}
                                </div>
                            </div>
                            <div id='est-container'>
                                <div class='flex'>
                                    <span>Est Lockdrop Rewards</span>
                                    <div>
                                        <span id='est-usd'>{amounts*boost}</span>
                                        <span>ZELO</span>
                                    </div>
                                </div>
                                <div class='flex'>
                                    <span>Est % of Rewards</span>
                                    <div>
                                        <span id='est-percent'>0.70</span>
                                        <span>%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button id="lockup-btn" onClick={toggleModal}>Lock Up</button>
                        {isModalOpen && <CustomInnerModal onRequestClose={toggleModal} />}
                    </div>
                </div>
            </div>
            <div class='info-wrapper'>
                <div id='info'>
                <h3>Project<br/>Information</h3>
                <p>
                {project[0].information}
                <br/><br/>
                Connect with us:
                <br/><br/>
                🐦 Twitter | 💬 Telegram
                </p>
                </div>
                <div id='period-info'>
                    <p>Phase 1  {getPhase1Period(project[0])}
                    <br/><br/>
                    Phase 2  {getPhase2Period(project[0])}</p>
                    <p>Withdrawable percentage in phase 2 :
                    <br></br> <br></br>
                    {reformatPhase2Period(project[0]).map((item) => 
                    <>
                    <span>{item}</span>
                    <br></br><br></br>
                    </>)}
                    </p>
                    
                </div>
                <div id='desclaimer'>
                <h3>Disclaimer</h3>
                <div class='num-paragraph'>
                    <span>
                    1
                    </span>
                    <p>
                    Users who participate in this LockDrop will recieve new token rewards with deposit<br/>
                    when the cliff periods over.
                    </p>
                </div>
                <div class='num-paragraph'>
                    <span>
                    2
                    </span>
                    <p>
                    Users need to be registered on LookLock to join the Lockdrop projects.
                    </p>
                </div>
                <div class='num-paragraph'>
                    <span>
                    3
                    </span>
                    <p>
                    During the Phase 1 period, no rewards will be generated.
                    </p>
                </div>
                <div class='num-paragraph'>
                    <span>
                    4
                    </span>
                    <p>
                    The user hereby confirms that participating in the activity is voluntary, and the<br/>
                    project administration and LookLock has not forced, interfered with, or influenced the<br/>
                    user’s decision in any way.
                    </p>
                </div>
                </div>
                <div id='riskwarn'>
                <h3>Risk Warning</h3>
                <p>
                Staking is a risk investment channel. Investors should be sensible in their participation<br/>
                and be aware of investment risks. The project administration and LookLock are not<br/>
                liable for users’ investment gains or losses. The information we provide is for users to<br/>
                conduct their own research. It is not investment advice. The project administration<br/>
                reserves the right of final interpretation of the activity.
                </p>
                </div>
            </div>
            <Footer/>
        </div>
    )
};
  
export default ProjectDetail;