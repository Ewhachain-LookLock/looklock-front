import {useState} from 'react';
import Footer from '../component/Footer';


const Admin = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    return (
        <body>
            <div class = 'Admin'>
                <h1>Admin.js file :)</h1>
            </div>
            <Footer />
        </body>
        
    )
}

export default Admin;