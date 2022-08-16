import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { Outlet, Link } from "react-router-dom";
import './NavBar.css';
import axios from "axios";
import reducer from '../utils/reducer';

const NavBar = ({currentAccount, correctNetwork, connectWallet, changeNetwork}) => {
    let defaultUser = [{isAdmin:false}];
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    const fetchUser = async (currentAccount) => {
        if (currentAccount === '') {
            console.log("no account yet!");
            dispatch({type:'SUCCESS', data:defaultUser})
            return
        }
        dispatch({type : 'LOADING'});
        try {
            const response = await axios.get(
                'http://localhost:3001/api/user', {params: {address: currentAccount}}
            );
            dispatch({type:'SUCCESS', data:response.data});
        } catch (e) {
            if (e.response.status === 404) {
                try {
                  const postResponse = await axios.post(
                    'http://localhost:3001/api/user', {address: currentAccount}
                  );
                  dispatch({type:'SUCCESS', data:postResponse.data});
                  return
                } catch (e) {
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
    if (!user) return <div>no data</div>;
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
                        <Link to="/projectdetail">MY STATUS</Link>
                    </li>
                    <li>
                        <Link to="/governance">PARTNER</Link>
                    </li>
                    {( (!!user[0] && user[0].isAdmin)) ? (
                    <li>
                        <Link to="/governance">ADMIN</Link>
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
                    <button disabled class = "wallet-btn">{currentAccount}</button>
                </div>
                )}
            </div>
        </nav>
        <Outlet/>
        </>
    )
};

export default NavBar;