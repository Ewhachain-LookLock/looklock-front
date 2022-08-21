import React from 'react';

import Footer from "../components/Footer";
import './MyStatus.css';
import BoardItem from "../components/BoardItem";

class MyStatus extends React.Component {

  render() {
    return (
      <body>
        <div id='myasset-page-wrapper'>
          <div id='myasset-wrapper'>
            <div id='myasset-container'>
              <h3>My asset</h3>
              <div id='myasset-box'>
                <span>Total locked assets</span>
                <div>
                  <span>2,300</span>
                  <span>LOLO</span>
                </div>
                <span>= 800 USD</span>
              </div>
            </div>
          </div>
          <div id='board-wrapper'>
            <h3>Board</h3>
            <div id='board-table-container'>
              <div id='board-header'>
                <span>My LOCK</span>
                <span>Amount locked</span>
                <span>% of rewards</span>
                <span>Fully unlocks on</span>
                <span>Phase</span>
                <span>Est Rewards</span>
                <span></span>
              </div>
              <div id='board-contents'>
                <BoardItem/>
                <BoardItem/>
                <BoardItem/>
                <BoardItem/>
                <BoardItem/>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </body>
    )
  }
  
};
  
export default MyStatus;