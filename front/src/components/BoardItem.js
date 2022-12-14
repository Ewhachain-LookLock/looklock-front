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
		<div class="modal__backdrop">
			<div class="modal__container">
				<p>
                Your rewards will be available in
				</p>
                <TimerTemp date="Sep 20, 2022 00:00:00"/>
                <div id='horizontal-line'></div>
                <h1 id='modal-congrats'>Congrats!</h1>
                <p>You can claim your rewards!</p>
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
                    <button type="button" class='modal-withdrawal-btn' onClick={onRequestClose}>
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
                <img id="swap-from-eth" src={require('../Assets/logo/marscoin-logo.png')} alt="from-token-img" class='asset-token-img' />
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
            <button onClick={toggleModal} class='claim-btn' id='custom-modal-here'>Claim</button>
            {isModalOpen && <CustomModal onRequestClose={toggleModal} />}
        </div>
    )
};
  
export default BoardItem;