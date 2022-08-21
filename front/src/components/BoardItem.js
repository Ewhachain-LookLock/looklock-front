import React, { useState } from "react";
import '../pages/MyStatus.css';
import Modal from './Modal';
// import Modal from 'react-modal';

const BoardItem = () => {

    return (
        <div class='board-item'>
            <div class='mylock-items'>
            <span>
                <img id="swap-from-eth" src={require('../Assets/logo/eth-logo.png')} alt="from-token-img" class='asset-token-img' />
            </span>
            <span>Marscoin</span>
            </div>
            <div class='amountlock-items'>
            <span>1,000</span>
            <span>UST</span>
            </div>
            <span>0.70%</span>
            <span>22.04.03.</span>
            <span class='unlocked-box'>Unlocked</span>
            <div class='est-rewards-items'>
            <span>10,000</span>
            <span>MARS</span>
            </div>
            <button onClick={() => this.openModal()} class='withdraw-btn'>Claim</button>
            <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                <h3>Modal title</h3>
                <p>Content</p>
            </Modal>
        </div>
    )
};
  
export default BoardItem;