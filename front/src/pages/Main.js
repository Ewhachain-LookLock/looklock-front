import './Main.css';
import Footer from '../components/Footer';

const Main = () => {
  return(
    <>
      <body>
        <div id='wrapper'>

          <img id="chain-left" src={require('../Assets/chain-left.png')} alt="chain-left"/>
          <img id="chain-right" src={require('../Assets/chain-right.png')} alt="chain-right"/>
          <div class="section main-wrapper">
            <h1 id='main-title'>
              Ultimate place
              <br/>to launch Lockdrop
            </h1>

            <p id="ultimate">
              Ultimate Place to launch & invest Lockdrop projects.
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
          <div class="section top-projects-wrapper">
            <h3 id='top3-title'>Top3 Lockdrop Projects</h3>
            <div class="project-container">
              <div class="project-header">
                <ul>
                  <li>
                    #
                  </li>
                  <li>
                    Name
                  </li>
                  <li>
                    Date
                  </li>
                  <li>
                    Participation rate
                  </li>
                  <li>
                    Minimum Amount
                  </li>
                  <li>
                    Rewards
                  </li>
                </ul>
              </div>
              <div class="project-rect-cont">
                <div class="project-rect">
                  
                </div>
                <div class="project-rect">
                  
                </div>
                <div class="project-rect">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </body>
    </>
  )
};
  
  export default Main;