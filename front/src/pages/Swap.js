import Footer from '../components/Footer';
// import './Swap.css';
import './Swap2.css';
import React, { useState } from "react";
import {ethers} from "ethers";
import Lolo from "../contracts/Lolo.json";
// import Modal from '../components/Modal';

// import { Modal, Button } from "react-bootstrap";

const Swap = ({_handleModal}) => {
  const contractAddress = "0xaFF9247f8FBAD77B088a032c5Ce08987db9C0ebD"
  const [amounts, setAmounts] = useState('');

  // Modal control
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  const onChange = (e) => {
    setAmounts(e.target.value);
  };

  const handleSwap = async () => {
    try{
      console.log("clicked");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const lolo = new ethers.Contract(contractAddress, Lolo.abi, signer);

      let swapTx = await lolo.swapForTest(amounts);
      console.log(swapTx);
      setShowModal(true);
    }catch {
      console.log("Error while swapping");
      setShowModal(true);
    }
  };

    return (
      <body>
        <div class='swap-container'>
          {/* LEFT */}
          <div class='swap-graph'>
            <img id="swap-graph-img" src={require('../Assets/swap-graph.png')} alt="Swap-Graph" />
          </div>
          {/* RIGHT */}
          <div class='swap-wrapper'>
            <h1>Swap</h1>
            <div class='to-from-wrapper'>
              <div class='token-wrapper from-wrapper'>
                <div class='swap-txt from-txt'>
                  <span>From</span>
                </div>
                <div class='swap-token'>
                  {/* left */}
                  <div class='from-token'>
                    <span>
                      <img id="swap-from-eth" src={require('../Assets/logo/eth-logo.png')} alt="from-token-img" class='swap-token-img' />
                    </span>
                    <span class='from-token-name'>ETH</span>
                    <span class="arrow-down"></span>

                  </div>
                  {/* right */}
                  <div class='amount-input from-amount'>
                    <input id='eth-input-area' fromAmount="fromAmount" min='0' placeholder='0' onChange={onChange} value={amounts} type="number"/>
                  </div>
                </div>
              </div>
              <span class="arrow-down" id='divider-arrow'></span>
              <div class='token-wrapper to-wrapper'>
                <div class='swap-txt to-txt'>
                  <span>To</span>
                </div>
                <div class='swap-token'>
                  <div class='to-token'>
                    <span>
                      <img id="swap-to-lolo" src={require('../Assets/logo/lolo-logo-white.png')} alt="to-token-img" class='swap-token-img'/>
                    </span>
                    <span class='to-token-name'>LOLO</span>
                    <span class="arrow-down"></span>
                  </div>
                  <div class='amount-input to-amount'>
                    {amounts}
                  </div>
                </div>
              </div>     
            </div> {/* end of to-from-wrapper */}

            <div class='slippage'>
              <div class='slippage-tolerance'>Slippage Tolerance</div>
              <div class='slippage-amount'>0.5%</div>
            </div>
            <button class="purple-gradient-btn" type="button" id="openModal" onClick={handleSwap}>
              Swap
              {/* <Modal /> */}
            </button>
            {/* <Modal _handleModal={_handleModal}>
              <h1>Project Detail</h1>
            </Modal> */}
            
            
            
          </div>  {/* end of swap-wrapper */}
        </div>
        <Footer/>
      </body>
    )
  };
  
  export default Swap;