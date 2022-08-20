import {useState} from 'react';
import Footer from '../components/Footer';


const Admintest = ({ }) => {
    return (
        <body>
            <div id='admin'>
                <img id="admin-withdrawing" src={require('../Assets/admin-withdrawing.png')} alt="admin-withdrawing"/>
            </div>
            <Footer />
        </body>
        
    )
}

export default Admintest;