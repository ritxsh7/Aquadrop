import React from 'react';
import {Link} from 'react-router-dom'

//images
import logo from '../images/logo.png'
import blueContact from '../images/blueContact.png'
import blueEmail from '../images/blueEmail.png'
import twtIcon from '../images/twtIcon.png'
import fbIcon from '../images/fbIcon.png'
import instaIcon from '../images/instaIcon.png'


//components
import Navbar from './Navbar'

export default function Header(){
    return(
        <div className='Header'>
            <div className='contacts'>

                <div className='contact-left'>
                    <div>
                        <img src={blueContact}></img>
                        <p>+91 9325721243</p>
                    </div>
                    <div>
                        <img src={blueEmail}></img>
                        <p>ritessshhh7@gmail.com</p>
                    </div>
                </div>
                <div className='contact-right'>
                    <ul>
                        <li><img className ="twt-icon" src={twtIcon}></img></li>
                        <li><img className ="fb-icon" src={fbIcon}></img></li>
                        <li><img className = "insta-icon" src={instaIcon}></img></li>
                    </ul>
                </div>

            </div>
            <div className='top'>
                <Link to = '/home' style={{textDecoration : 'none', color:'whitesmoke'}}>
                    <div className='logo'>
                        <img src={logo}/>
                        <h1><b>AquaDrop</b></h1>
                    </div>
                </Link>
                <Navbar />
            </div>
        </div>
    )
}
