import Footer from '../components/Footer';
// import './Swap.css';
import './Swap2.css';
import React, { useState } from "react";
import {ethers} from "ethers";
import Lolo from "../contracts/Lolo.json";
import Modal from '../pages/Modal';


const Swap = () => {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const [amounts, setAmmounts] = useState('');
  // const [modalOpen, setModalOpen] = useState(false);
  // Modal control
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onChange = (e) => {
    setAmmounts(e.target.value);
  };

  const handleSwap = async () => {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const lolo = new ethers.Contract(contractAddress, Lolo.abi, signer);

      let swapTx = await lolo.swapForTest(amounts);
      this.openModal();
    }catch {
      console.log("Error while swapping");
      this.openModal();
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
                    <input fromAmount="fromAmount" min='0' placeholder='0' onChange={onChange} value={amounts} type="number"/>
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
                      <img id="swap-to-lolo" src={require('../Assets/logo/lolo-logo.png')} alt="to-token-img" class='swap-token-img'/>
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
              <div class='slippage-ammount'>0.5%</div>
            </div>
            <button class="purple-gradient-btn" type="button" id="openModal" onClick={handleSwap}>
              Swap
            </button>
            <Modal open={modalOpen} close={closeModal} header="Alert">
              { /*Success*/}
              <img id="swap-success-img" src={require('../Assets/lockdrop-success-alert.png')} alt="Swap-Success" />      
              <div class='swap-success'>
                <button class="success-btn" type="button" id="swap-success-btn" onClick={closeModal}>
                  Done
                </button>
              </div>    
            </Modal>
          </div>  {/* end of swap-wrapper */}
        </div>
        <Footer/>
      </body>
    )
  };
  
  export default Swap;