import Footer from '../components/Footer';
import './Help.css';
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <body>
      <div id='partner-wrapper'>
        {/* What */}
        <div class='help-title-wrapper'>
          <h1 id='help-title'>
            What is Lockdrop?
          </h1>
          <p>
          The lockdrop is a new method for distributing tokens without raising funds.
          </p>
          <p>
          “Lockup” + “Airdrop”
          </p>
          <p>
            To acquire free tokens in a lockdrop, users must make a small commitment.<br/> 
            You stake one token for a set amount of time and then receive the remainder of the tokens<br/> 
            as well as other tokens when they are released. 
            <br/><br/>
            Staking time varies depending on the token,<br/> 
            and normally, the longer the existing tokens are locked in that smart contract,<br/> 
            the more tokens that holder will receive in the new network.  
          </p>
        </div>
        {/* History */}
        <div class='help-title-wrapper'>
          <h2 id='help-title2'>
          The History of Lockdrop
          </h2>
          <p>
            Commonwealth Labs first introduced the concept of Lockdrop<br/> 
            on their Edgeware network that ran on Polkadot Blockchain.<br/> 
            In 2019, Edgeware’s lockdrop gave away almost 90% of its tokens by means of lockdrop.
          </p>
        </div>
        {/* Airdrop */}
        <div class='help-title-wrapper'>
          <h2 id='help-title2'>
          How is lockdrop different from airdrop?</h2>
          <p>
            In comparison to airdrop, lockdrop takes greater commitment from the user.<br/> 
            An airdrop can be received simply for supporting a protocol, however a lockdrop requires you<br/> 
            to stake your crypto with a new protocol beforehand, making it more committed.
          </p>
          <p>
          Airdrop
          </p>
          <p>
          It basically sent tokens to random addresses for free in the hopes that if more people<br/> 
          held the token, then more people would care about it and the project.<br/> 
          In practice, however, most airdropped tokens were either sold quickly or sat in the wallets unnoticed.  
          </p>
          <p>
          Lockdrop
          </p>
          <p>
          Even though your crypto assets are not being spent or burned, the idea that you are unable<br/> 
          to use them for a period of time shows at least some level of commitment to the project.<br/>
          Ideally, this will result in new token holders who are more active and interested in the project from the very beginning. 
          </p>
          <p>
          So lockdrops promote commitment and stay for longer, whereas airdrops simply produce a brief buzz that fades shortly.
          </p>
        </div>
        {/* Phase */}
        <div class='help-title-wrapper'>
          <h2 id='help-title2'>
          Phase in LookLock</h2>
          <p>
          During the phase 1 & 2, estimated rewards를 consider하여 자신의 deposit&withdrawal amount를 정하면 된다.
          </p>
          <div id='phase-grid-textarea'>
            <span>Phase 1</span>
            <span>Period when investors can deposit and withdraw freely without any limitation.</span>
            <span>Phase 2</span>
            <span>Phase 2 starts immediately after Phase 1 ends. 
            <br/><br/>
            Deposits are no longer possible and investor can withdraw only.<br/>
            Withdrawable percentage decreases linearly over a specific period until the end of the phase 2.<br/>
            Only 1 withdrawal transaction can be made during this period.</span>
          </div>
        </div>
      </div>
      <Footer/>
    </body>
  )  };
  
  export default Help;