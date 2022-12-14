import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { Outlet, Link } from "react-router-dom";
import './NavBar.css';
import axios from "axios";
import reducer from '../utils/reducer';

const NavBar = ({currentAccount, correctNetwork, connectWallet, changeNetwork, disconnectWeb3Modal}) => {
    let defaultUser = [{isAdmin:false}];
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    const fetchUser = async (currentAccount) => {
        if (currentAccount === '' | currentAccount === undefined) {
            console.log("no account yet!");
            dispatch({type:'SUCCESS', data:defaultUser})
            return
        }
        dispatch({type : 'LOADING'});
        try {
            const response = await axios.get(
                'https://looklock-backend.herokuapp.com/api/user', {params: {address: currentAccount}}
            );
            dispatch({type:'SUCCESS', data:response.data});
        } catch (e) {
            if (e.response.status === 404) {
                try {
                  const postResponse = await axios.post(
                    'https://looklock-backend.herokuapp.com/api/user', {address: currentAccount}
                  );
                  dispatch({type:'SUCCESS', data:postResponse.data});
                  return
                } catch (e) {
                    console.log(e.message);
                    dispatch({type:'ERROR', error:e})
                }
              }
            dispatch({type :'ERROR', error:e})
        }
    };
    
    
    useEffect(() => {
    fetchUser(currentAccount);
    }, [currentAccount]);

    const {loading, data:user, error } = state;
    if (loading) console.log("loading..");
    if (error) return <div>error</div>;
    if (!user) return <div>Loading..</div>;
    return (
        <>
        <nav id="navbar">
            {/* Left Side - Logo */}
            <div class='logo'>
                <Link to="/">
                    <img src={require("../Assets/header-logo.png")} alt="Looklock logo"/>
                </Link>
            </div>

            {/* Right Side - Sections and Connect */}
            <div class='gnb-box'>
                <ul id="links">
                    <li>
                        <Link to="/project">PROJECT</Link>
                    </li>
                    <li>
                        <Link to="/swap">SWAP</Link>
                    </li>
                    <li>
                        <Link to="/mystatus">MY STATUS</Link>
                    </li>
                    <li>
                        <Link to="/partner">PARTNER</Link>
                    </li>
                    {( (!!user[0] && user[0].isAdmin)) ? (
                    <li>
                        <Link to="/admin">ADMIN</Link>
                    </li>
                    ) : <></>
                    }
                </ul>
                {/* Connect */}
                {currentAccount === '' ? (
                    <div class= "wallet">
                        <button class= "wallet-btn" onClick={connectWallet}>Connect Wallet</button>
                    </div>
                ) : !correctNetwork ? (
                    <div class= "wallet">
                        <button class= "wallet-btn"onClick={changeNetwork}>Change Network</button>
                    </div>
                ) : 
                (
                <div class= "wallet">
                    <button class = "wallet-btn" onClick={disconnectWeb3Modal}>Disconnect Wallet</button>
                </div>
                )}
            </div>
        </nav>
        <Outlet/>
        </>
    )
};

export default NavBar;