import React, { useReducer } from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import reducer from "../../utils/reducer";
import Timer from '../Timer';
import BarGraph from '../BarGraph';
import { dateFormatter } from "../../utils/dateFromatter";

export const ProjectInfo= (props) => {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    const fetchProject = async () => {
        dispatch({type : 'LOADING'});
        try {
            const response = await axios.get(
                'https://looklock-backend.herokuapp.com/api/project', {params: {title: props.title}}
            );
            dispatch({type:'SUCCESS', data:response.data});
        } catch (e) {
            dispatch({type :'ERROR', error:e})
        }
    };


    useEffect(()=> {
        fetchProject(props.title);
    },[]);

    const {loading, data:project, error } = state;

    const getPhase = (project) => {
        const now = new Date().getTime();
        const phase1due = new Date(project.startDate);
        phase1due.setDate(phase1due.getDate() + Number(project.phase1period));
       
        if (now > phase1due.getTime()) return "PHASE2";
        return "PHASE1";

    }

    const getPhase1Period = (project) => {
        const startDate =  new Date(project.startDate);
        const endDate = new Date(project.startDate);
        endDate.setDate(endDate.getDate() + Number(project.phase1period));

        return dateFormatter(startDate)+ '~' + dateFormatter(endDate);
    }

    const getPhase2Period = (project) => {
      const startDate =  new Date(project.startDate);
      startDate.setDate(startDate.getDate() +( Number(project.phase1period) +1));

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Number(project.phase2DueDate));

      return dateFormatter(startDate)+ '~' + dateFormatter(endDate);
    }

    if (loading) console.log("loading..");
    if (error) return <div>요청한 데이터가 없습니다. </div>;
    if (!project) return <div> Loading.. </div>;
    
    return( 
        <div class='mystatus-container'>
          <div class='profile-wrapper'>
            <div class='user-wrapper'>
              <div>
                <img id="profile-img" src={require('../../Assets/profile.png')} alt="chain-left"/>
              </div>
              <div id='status-wrapper'>
                <h1>{project[0].title}</h1>
                <div class='phase-container'>
                  <div class='phase-wrapper'>
                    {/* TIMER */}
                    <div id='timer'>
                      <span>
                        {getPhase(project[0])}
                      </span>
                      <span>
                        TIME LEFT IN THIS PAHSE
                      </span>
                      {/* <div>
                        <Timer/>
                      </div> */}
                    </div>

                    {/* PHASE 1, 2 */}
                    <div id='phases'>
                      <div>
                        <span class = {getPhase(project[0])==="PHASE1" ? '' : 'hidden-txt'}>
                          now
                        </span>
                        <span>
                          Phase 1
                        </span>
                        <span>
                          {getPhase1Period(project[0])}
                        </span>
                      </div>
                      <div>
                        <span class = {getPhase(project[0])==="PHASE2" ? '' : 'hidden-txt'}>
                          now
                        </span>
                        <span>
                          Phase 2
                        </span>
                        <span>
                        {getPhase2Period(project[0])}
                        </span>
                      </div> 
                    </div>
                  </div>
                  <div class='bar-graph'>
                    {/* Bar Graph */}
                    <BarGraph />
                  </div>
                </div>
              </div>
            </div>
            <div class='rewards-wrapper'>
              <div class='rules-container'>
                <h3>Rules</h3>
                <div class='rules-content'>
                  <ul id='rules-header'>
                    <li>project</li>
                    <li>date</li>
                    <li>allocated amount</li>
                    <li>participation rate</li>
                  </ul>
                  <ul id='rules-body'>
                    <li>Alex</li>
                    <li>22.04.01~22.04,09</li>
                    <li>3,000,000,000</li>
                    <li>70%</li>
                  </ul>
                </div>
              </div>
              <div class='rewards-container'>
                <h3>Rewards</h3>
                <div>
                  <img id="reward-img" src={require('../../Assets/reward.png')} alt="reward-img"/>
                </div>
              </div>
            </div>
            <div class='lockdrop-popup'>
              <button class="purple-gradient-btn" type="button" id="popupDom">
                Lock Up
              </button>

            </div>
          </div>
         
          <div class='info-wrapper'>
            <div id='info'>
              <h3>Project<br/>Information</h3>
              <p>
              Zelo protocol is web3’s automation network, enabling developers to automate & relay arbitrary smart contract executions on and across all EVM-based compatible
              blockchains such as Ethereum.
              <br/><br/>
              Zelo’s goal is to provide developers with a reliable, scalable & decentralized network to which they can outsource all of their web3 related DevOps operations.
              <br/><br/>
              ► Check out what we’ve been working on at https://zelo.protocol
              <br/><br/>
              Connect with us:
              <br/><br/>
              🐦 Twitter | 💬 Telegram
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
        </div>
    )

}