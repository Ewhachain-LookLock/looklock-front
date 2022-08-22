import React from "react";
import '../pages/MyStatus.css';
import './Style.css';
import TimerTemp from './TimerTemp.js';

// import ReactDOM from 'react-dom';

const { useState, useEffect } = React;

const CustomModal = ({ onRequestClose }) => {
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
			<div class="modal__container">
				<p>
                Your rewards will be available in
				</p>
                <TimerTemp date="Sep 20, 2022 00:00:00"/>
                <div id='horizontal-line'></div>
                <h1 id='modal-congrats'>Unavailable</h1>
                <p> </p>
                <div id='modal-sum-area'>
                    <div class='modal-grey-box'>
                        <span>Token Rewards</span>
                        <span>700</span>
                        <span>ZELO</span>
                    </div>
                    <div>+</div>
                    <div class='modal-grey-box'>
                        <span>Locked asset</span>
                        <span>1400</span>
                        <span>LOLO</span>
                    </div>
                </div>
                <div id='modal-btn-area'>
                    <button type="button" class='modal-unavailable-btn' onClick={onRequestClose}>
                    Claim 700 ZELO & 1400 LOLO
                    </button>
                </div>
			</div>
		</div>
	);
};

const BoardItem = () => {

    const [isModalOpen, setModalIsOpen] = useState(false);
	
	console.log(useState("hello")[1])
	const toggleModal = () => {
		setModalIsOpen(!isModalOpen);
	};

    return (
        <div class='board-item'>
            <div class='mylock-items'>
            <span>
                <img id="swap-from-eth" src={require('../Assets/logo/zelo-logo.png')} alt="from-token-img" class='asset-token-img' />
            </span>
            <span>ZELO</span>
            </div>
            <div class='amountlock-items'>
            <span>3,000</span>
            <span>LOLO</span>
            </div>
            <span>0.68%</span>
            <span>22.05.15.</span>
            <span class='locked-box'>Locked</span>
            <div class='est-rewards-items'>
            <span>8,000</span>
            <span>ZELO</span>
            </div>
            <button onClick={toggleModal} class='days-btn' id='custom-modal-here'>-40 days</button>
            {isModalOpen && <CustomModal onRequestClose={toggleModal} />}
            {/* <div id='custom-modal-here'></div> */}
            {/* <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                <h3>Modal title</h3>
                <p>Content</p>
            </Modal> */}
        </div>
    )
};
  
export default BoardItem;