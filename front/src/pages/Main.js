import './Main.css';
import Footer from '../components/Footer';

const Main = () => {

  // 이미지 우클릭 방지
  document.addEventListener("contextmenu", e => {
    e.target.matches("img") && e.preventDefault()
  })

  return(
    <>
      <body>
        <div id='wrapper'>

          <img id="chain-left" src={require('../Assets/chain-left.png')} alt="chain-left"/>
          <img id="chain-right" src={require('../Assets/chain-right.png')} alt="chain-right"/>
          <div class="section main-wrapper">
            <h1 id='main-title'>
              Uncover the
              <br/>potential of Lockdrop
            </h1>

            <p id="ultimate">
              Be a part of boosting lockdrop projects<br/>
              on ultimate decentralized platform LOOKLOCK.  
            </p>
            <button class="lockdrop-btn">
              Go To Lockdrop
            </button>
            <div class="statistics">
              <ul id='stats'>
                <li>
                  <p class="txt-big">1.57</p>
                  <p class="txt-small">$LOLO</p>
                </li>
                <li>
                  <p class="txt-big">223.63</p>
                  <p class="txt-small">Total Liquidity</p>
                </li>
                <li>
                  <p class="txt-big">1.64</p>
                  <p class="txt-small">Total Volume</p>
                </li>
                <li>
                  <p class="txt-big">13 m</p>
                  <p class="txt-small">Users</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="section" id="concepts-container">
            {/* left */}
            <div id="concepts-wrapper">
              <div id="concept-left">
                <div>
                  <img id="project-main" src={require('../Assets/project-main.png')} alt="project-main"/>
                </div>
                <div>
                  LookLock is an aggregator platform <br/>
                  where you can easily find <br/>
                  all lockdrop projects.
                </div>
              </div>
              {/* right */}
              <div id="concept-right">
                <div>
                  <img id="lolo-lock" src={require('../Assets/lolo-lock.png')} alt="lolo-lock"/>
                </div>
                <div>
                The simplest way<br/>
                to lock your asset<br/> 
                in token generation events.
                </div>
              </div>
            </div>
          </div>
          {/* LOLO */}
          <div id='ratio-container'>
            <div id='ratio-wrapper'>
              {/* left */}
              <div id='ratio-left'>
                <h1>What is LOLO?</h1>
                <p>LOLO is LookLock’s own Token for<br/> 
                participating Lockdrop projects.<br/> 
                It is set as the default lockup <br/> 
                token for all projects.
                </p>
                <p>
                Choose whether to use it or not<br/> 
                : If you use LOLO token for projcets,<br/> 
                platform using fee is to be exempted.
                </p>
              </div>
              <span id="lolo-token"/>
              {/* right */}
              <div id='ratio-right'>
                <span id='text-current-ratio'>Current Ratio</span>
                {/* grid container */}
                <div id='ratio-grid'>
                  <span class="white-txt-60">1 LOLO</span>
                  <span class="white-txt-60">=</span>
                  <span class="white-txt-60">1.22 USD</span>
                  <span class="txt-currency">8,092,433 LOLO</span>
                  <span></span>
                  <span class="txt-currency">9,354,672 USD</span>
                </div>
              </div>
            </div>
          </div>
          <div class="section top-projects-wrapper">
            <h3 id='top3-title'>Top3 Lockdrop Projects</h3>
            <img id="top3-projects" src={require('../Assets/top3-projects.png')} alt="top3-projects"/>
          </div>
        </div>
        <Footer />
      </body>
    </>
  )
};
  
  export default Main;