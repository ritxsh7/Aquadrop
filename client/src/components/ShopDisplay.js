import React from 'react'

//images
import location from '../images/locationIcon.png'
import star from '../images/ratingStar.png'

import '../styles/shopDisplay.css'

export default function ShopDisplay(props) {
  return (
    <div className='shopDisplay'>
        <img className='shopImage' src='https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt='shopImage'>
        </img>

        <div className='shopInfo'>
            <h1 className='heading' style={{fontSize:'50px'}}>{props.name}</h1>
            <div className='location'>
                <img src={location} style={{width:'30px', marginRight:'12px'}}></img>
                <p style={{fontSize:'20px' }}>{props.distance} KM</p>
            </div>
            <p className='shotPara'>The offers available on Bisleri online platforms are only applicable for end consumers and not for any channel partners.The offers available on Bisleri online platforms are only applicable for end consumers and not for any channel partners.The offers available on Bisleri online platforms are only applicable for end consumers and not for any channel partners.</p>
            <div className='ratings'>
                <h2>{props.ratings}</h2>
                <img src={star} style={{width:'30px'}}></img>
            </div>
        </div>
    </div>
  )
}
