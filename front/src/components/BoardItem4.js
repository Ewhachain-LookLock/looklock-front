import React from "react";
import '../pages/MyStatus.css';
import './Style.css';
import TimerTemp from "./TimerTemp";

// import ReactDOM from 'react-dom';

const { useState, useEffect } = React;

const CustomModal = ({ onRequestClose }) => {

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
			<div className="modal__container">
				<h3 className="modal__title">Withdraw Liquidity</h3>
				<p>
                You can withdraw 100% of your locked assets<br/>
                until the timer ends.
				</p>
                <TimerTemp/>
                <p id='red-modal-txt'>Only 1 withdrawal transaction can be<br/> made after the phase 2 begins.</p>
                <div id='horizontal-line'></div>
                <div class='modal-grid-box'>
                    <span>Locked until</span>
                    <span>22.05.15</span>
                    <span>Your Deposits</span>
                    <span>700 LOLO</span>
                    <span>Max witdrawable amount</span>
                    <span>700 LOLO</span>
                </div>
                <div id='modal-withdrawal-amount'>
                    <p>Withdrawal Amount</p>
                    {/* input */}
                    <div class='modal-input-area'>
                        <span>700 LOLO</span>
                    </div>
                    <p>My locked token in the pool : 0 LOLO</p>
                </div>
                <div id='modal-li-txt'>
                    <ul>
                        <li>· Deposits close after phase 1 and only withdrawals are allowed in phase 2.</li>
                        <li>· The max withdrawable amount decreases linearly in phase 2.</li>
                        <li>· From 4/10 to 4/11, users can withdraw up to 80% of their deposit.</li>
                        <li>· From 4/12 to 4/13, users can withdraw up to 50% of their deposit.</li>
                        <li>· On 4/14, users can withdraw up to 30% of their deposit.</li>
                        <li>· On 4/15, the final day. users can withdraw up to 10% of their deposit.</li>
                    </ul>
                </div>
                <div id='modal-btn-area'>
                    <button onClick={() => {
                        toggleModal()
                    }} class='modal-withdrawal-btn' id='custom-modal-here'>
                        Withdrawal
                    </button>
                    {isModalOpen && <CustomInnerModal onRequestClose={toggleModal} />}

                </div>
			</div>
		</div>
	);
};

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
                    <img src={require("../Assets/success-modal-img.png")} class='success-modal-img' alt="success img"/>
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
                <img id="swap-from-eth" src={require('../Assets/logo/xSigma-logo.png')} alt="from-token-img" class='asset-token-img' />
            </span>
            <span>xSigma</span>
            </div>
            <div class='amountlock-items'>
            <span>1,500</span>
            <span>KSP</span>
            </div>
            <span>0.25%</span>
            <span>22.06.20.</span>
            <span class='phase2-box'>Phase 2</span>
            <div class='est-rewards-items'>
            <span>5,000</span>
            <span>SIG</span>
            </div>
            <button onClick={toggleModal} class='withdraw-btn' id='custom-modal-here'>Withdraw</button>
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