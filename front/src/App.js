import { useState, useEffect} from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import NavBar from "./components/NavBar";
// sequence wallet
import { ethers } from 'ethers'
import Web3Modal from '@0xsequence/web3modal'
import { sequence } from '0xsequence';
import { configureLogger } from '@0xsequence/utils'

import Main from "./pages/Main";
import NoPage from "./pages/NoPage";

import Project from './pages/Project';
import Swap from './pages/Swap';
import MyStatus from './pages/MyStatus';
import ProjectDetail from './pages/ProjectDetail';
import Partner from './pages/Partner';
import About from './pages/About';
// import Admin from './pages/Admin';
import Admin from './pages/Admintest';
import Register from './pages/Register';
import Memo from "./components/Memo";


configureLogger({ logLevel: 'DEBUG' })

let providerOptions = {
}

if (!window?.ethereum?.isSequence) {
  providerOptions = {
    sequence: {
      package: sequence,
      options: {
        appName: 'LookLock',
        defaultNetwork: 'polygon'
      }
    }
  }
}

const web3Modal = new Web3Modal({
  providerOptions,
  cacheProvider: true
})



export default function App() {
  const [provider, setProvider] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);

  useEffect(() => {
    // if (web3Modal.cachedProvider) {
    //   connectWallet()
    // }
    checkCorrectNetwork();

  }, [currentAccount])

  const connectWeb3Modal = async () => {
    if (web3Modal.cachedProvider) {
      web3Modal.clearCachedProvider()
    }
    connectWallet()
  };

  const connectWallet = async () => {
    const wallet = await web3Modal.connect()
    console.log('wallet : ' , wallet);
    const provider = new ethers.providers.Web3Provider(wallet)

    if (wallet.sequence) {
      ;(provider).sequence = wallet.sequence
    }

    setProvider(provider);
    console.log([provider]);
    getAccounts(provider);

  }

  const disconnectWeb3Modal = async () => {
    web3Modal.clearCachedProvider();

    if (provider && (provider).sequence) {
      const wallet = (provider).sequence;
      wallet.disconnect()
    }

    setProvider(null);
    setCurrentAccount('');
    
    
  }

  const getChainID = async () => {
    if (provider) {
      const signer = provider?.getSigner();
      const chainId = await signer.getChainId()
      console.log('signer.getChainId()', chainId, typeof(chainId));
      return chainId;
    }
    else return
  }

  const getAccounts = async (provider) => {
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    console.log('getAddress():', account);
    console.log('ci : ' , await signer.getChainId());
    setCurrentAccount(account);
  }

  const changeNetwork = async() => {
      const localhost = '0x539'
      const rinkeby = '0x4'
      const polygonMainnet = '0x89'
      const mumbai = '0x13881'
      if (window.ethereum.networkVersion !== mumbai) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: mumbai }]
            });
          } catch (err) {
              // This error code indicates that the chain has not been added to MetaMask
            if (err.code === 4902) {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainName: 'Mumbai',
                    chainId: mumbai,
                    rpcUrls: ['https://rpc-mumbai.maticvigil.com/']
                  }
                ]
              });
            }
          }
        }
  }

    const checkCorrectNetwork = async () => {
        const chainId = await getChainID();
        const hardhatChainId = 1337
        const mumbaiChainId = 80001
    
        if (chainId !== mumbaiChainId) {
          setCorrectNetwork(false)
        }else {
          setCorrectNetwork(true)
        }
    }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
              <NavBar 
                currentAccount={currentAccount}
                correctNetwork= {correctNetwork}
                connectWallet = {connectWeb3Modal}
                changeNetwork = {changeNetwork}
                disconnectWeb3Modal = {disconnectWeb3Modal}
              ></NavBar>}>
            <Route index element={<Main />} />
            <Route path="project" element={<Project />} />
            <Route path='project/detail/:id' element={<ProjectDetail />} />
            
            <Route path="swap" element={<Swap />} />
            <Route path="about" element={<About />} />
            <Route path="admin" element={<Admin />} />
            <Route path="mystatus" element={<MyStatus />} />
            <Route path="partner" element={<Partner currentAccount = {currentAccount}/>} />
            <Route path="*" element={<NoPage />} />
            {/* 디버깅용으로 register 페이지 임시 추가 */}
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
