import React from "react";
import '../pages/MyStatus.css';
import './Style.css';
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
			<div className="modal__container">
				<h3 className="modal__title">Withdraw Liquidity</h3>
				<p>
                You can withdraw 100% of your locked assets
 until the timer ends.
				</p>
                <div id='modal-btn-area'>
                    <button type="button" class='modal-withdrawal-btn' onClick={onRequestClose}>
                        Withdrawal
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
                <img id="swap-from-eth" src={require('../Assets/logo/eth-logo.png')} alt="from-token-img" class='asset-token-img' />
            </span>
            <span>Kinetic</span>
            </div>
            <div class='amountlock-items'>
            <span>1,000</span>
            <span>UST</span>
            </div>
            <span>0.70%</span>
            <span>22.04.03.</span>
            <span class='phase1-box'>Phase 1</span>
            <div class='est-rewards-items'>
            <span>10,000</span>
            <span>MARS</span>
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