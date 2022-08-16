import { useState, useEffect} from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import NavBar from "./component/NavBar";
import Main from "./pages/Main";
import NoPage from "./pages/NoPage";

import Project from './pages/Project';
import Swap from './pages/Swap';
import MyStatus from './pages/MyStatus';
import ProjectDetail from './pages/ProjectDetail';
import Governance from './pages/Governance';
import About from './pages/About';
import Admin from './pages/Admin';
import Register from './pages/Register';
import Memo from "./components/Memo";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);

  const checkIfWalletIsConnected = async () => {
      const {ethereum} = window;
      if (ethereum) {
          console.log('Got the ethereum object: ', ethereum);
      }else {
          console.log('No Wallet found. Connect Wallet');
      }

      const accounts = await ethereum.request({method: "eth_accounts"});

      if (accounts.length !== 0) {
          console.log('Found authorized Account: ', accounts[0]);
          setCurrentAccount(accounts[0]);
      }else {
          console.log('No authorized account found');
      }
  };

  const connectWallet = async () => {
      try {
        const {ethereum} = window;
  
        if(!ethereum) {
          console.log('Metamask not detected');
          return;
        }
        let chainId = await ethereum.request({method:'eth_chainId'})
        
        const address = await ethereum.enable();
        await console.log('address : ', address);
        
        const hardhatChainId = '0x539'
        if (chainId !== hardhatChainId) {
          alert('You are not connected to the Hardhat Testnet!');
          return;
        }
      
        console.log('Found account', address[0]);
        setCurrentAccount(address[0]);
      } catch(error) {
        console.log('Error connecting to metamask', error)
      }
  }

  const changeNetwork = async() => {
      const chainId = '0x539'
      if (window.ethereum.networkVersion !== chainId) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chainId }]
            });
          } catch (err) {
              // This error code indicates that the chain has not been added to MetaMask
            if (err.code === 4902) {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainName: 'Localhost',
                    chainId: chainId,
                    rpcUrls: ['http://localhost:8545/']
                  }
                ]
              });
            }
          }
        }
  }

    const checkCorrectNetwork = async () => {
        const {ethereum} = window;
        let chainId = await ethereum.request({method : 'eth_chainId'})
        console.log('Conneted to chian' + chainId);
    
        const hardhatChainId = '0x539'
    
        if (chainId !== hardhatChainId) {
          setCorrectNetwork(false)
        }else {
          setCorrectNetwork(true)
        }
    }

    useEffect(() => {
      checkIfWalletIsConnected();
      checkCorrectNetwork();
    }, [currentAccount]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
              <NavBar 
                currentAccount={currentAccount}
                correctNetwork= {correctNetwork}
                connectWallet = {connectWallet}
                changeNetwork = {changeNetwork}
              ></NavBar>}>
            <Route index element={<Main />} />
            <Route path="project" element={<Project />} />
            <Route path="projectdetail" element={<ProjectDetail title="Look"/>} />
            <Route path="swap" element={<Swap />} />
            <Route path="about" element={<About ></About>} />
            <Route path="admin" element={<Admin ></Admin>} />
            <Route path="mystatus" element={<MyStatus />} />
            <Route path="governance" element={<Governance currentAccount = {currentAccount}/>} />
            <Route path="*" element={<NoPage />} />
            {/* 디버깅용으로 register 페이지 임시 추가 */}
            <Route path="register" element={<Register></Register>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
