import React from 'react'

//style
import '../styles/HomeIntro.css'

//compo
import Header from '../components/Header'

export default function () {
  return (
    <div className='homeIntro' style={{ color: 'white' }}>
      <div className='homeIntroContent'>
        
        <div className='tagLiner'>
          <h1>Quick Deliver ,<br /></h1><h1>Quench Thirst</h1>
          {/* <h2>WateRevolution !!!</h2> */}
        </div>
        <div className='searchBar'>
          <input type='text' placeholder='Search for stores...' className='searchField'></input>
          <button className='searchButton'>
            Search
          </button>
        </div>
      </div>

    </div>
  )
}
