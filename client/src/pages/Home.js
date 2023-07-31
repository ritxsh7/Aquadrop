import React from 'react'
import StoresArray from '../static/data'
import {Link} from 'react-router-dom'

//components 
import StoresCard from '../components/StoresCard'
import HomeIntro from '../components/HomeIntro'
import { CartState } from '../context/Context'
import Header from '../components/Header'


export default function Home() {

    const { state : {shops}, dispatch} = CartState();

   const StoresData = shops.map(item => {
    
    return(
        <Link to = {`/product/${item.key}`} style={{textDecoration:'none'}}>
            <StoresCard
                key = {item.key} 
                {...item}
            />
        </Link>
    )}) 

  return (
    <div className='homepage'>
        
        <HomeIntro />

        <h1 style={
            {
                color:'white',
                textAlign:'center',
                padding:'30px',
                fontSize: '2.4rem', 
                backgroundColor: 'black' 
            }
            }>
            Shop from the best shops near you
        </h1>

        <div className ='shop-by-store'>
            {StoresData}
        </div>
    </div>
    )
}
