// Modal.js
import React from "react";
import styled from 'styled-components';
 
const Modal = ({ _handleModal, children, ...rest }) => {

 
  return (
    <h1>Modal</h1>
    // <Container>
    //     <Background onClick={_handleModal} />
    //     <ModalBlock {...rest}>
    //         <Close onClick={_handleModal} />
    //         <Contents>
    //             {children}
    //         </Contents>
    //     </ModalBlock>
    // </Container>
  );
}
 
export default Modal;
