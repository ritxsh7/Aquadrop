import React from 'react'
import ratingStar from '../images/ratingStar.png'

// style
import '../styles/StoresCard.css'

//images
import locationIcon from '../images/locationIcon.png'

export default function StoresCard(props) {
    
  return (
    <div className='storescard'>

        <div className='img-div'>
          <img className='storecard-image' src={props.image}></img>
        </div>
        
        <div className='stats' style={{
          display : 'flex', flexDirection:'column'
      }}>

          <div className='stats-title'>
            <h2 className='storecard-name'>{props.name}</h2>

            <div className='storecard-ratings'>
                <p>{props.ratings}</p>
                <img src={ratingStar}></img>
            </div>
          </div>

          <div className='location' style={{display:'flex' , justifyContent:'space-between', paddingTop:6, fontSize:'0.9rem',alignItems:'center'}}>

              <p>{props.location}</p>

              <div className='marker' style={{display:'flex', alignItems:'center'}}>
                <img src={locationIcon} style={{width:20, marginRight:6}}></img>
                <p>{props.distance} KM</p>
              </div>
              
          </div>
        </div>
    </div>
  )
}
