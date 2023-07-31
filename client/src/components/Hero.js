import React from 'react'
// import {useHistory} from "react-router-dom";

function Hero(){

    // const history = useHistory();

    return(
        <div className='hero'>
            <div className='hero-content'>
                <h1 className='welcome'><b>WELCOME TO AQUADROP</b></h1>
                <h1 className='tag'> Water Delivered, Life Elevated</h1>
                <div className='buttons'>
                    <button className='explore'>EXPLORE</button>
                    <button className='join-us'>JOIN US</button>
                </div>
            </div>
        </div>
    )
}

export default Hero;