import {useState} from 'react';
import Footer from '../components/Footer';


const Admin = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    // async function connectAccount(){
    //     if (window.ethereum) {
    //         const accounts = await window.ethereum.request({
    //             method: "eth_requestAccounts",
    //         });
    //         setAccounts(accounts);
    //     }
    // }

    return (
        <body>
            <div class = 'About'>
                <div>Admin</div>     
                <div>Look and Lock. Your chances are all here. </div>

            </div>
            <Footer />
        </body>
        
    )
}

export default Admin;