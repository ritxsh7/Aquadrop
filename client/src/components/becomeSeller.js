import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { CartState } from '../context/Context';
import { Form } from 'react-bootstrap';
import sideBanner from '../images/side-banner.png'

import '../styles/addProducts.css'

//API Call
import connection from '../../../server/APIs/distance.js';

export default function AddProducts() {

  const { state: { shops }, dispatch } = CartState();

  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [location, setLocation] = useState('');


  const sampleShop = {
    key: shops.length + 1,
    name: name,
    ratings: 0,
    image: imgUrl,
    location: location,
    distance: connection(), //distance calculated from API
    products: [
      {
        id: 11,
        name: 'Water Can (40L)',
        mrp: '45',
        qty: '45 ltr',
        img: 'https://bisleri-shop-storage.s3.ap-south-1.amazonaws.com/products/May4044/zcOPiHGDYwnhMxovjOyQ.jpg',
        n: 4
      }
    ]
  }

  const showSample =() => {
    console.log(shops);
  }

  const clearFields = () => {
    setName('');
    setImgUrl('');
    setLocation('');
  }

  return (

    <div className='seller-wrapper'>

      <h2>
        JOIN AQUADROP
      </h2>
      <h1>
        Clean Water, For All
      </h1>

      <div className='input-form'>
        <label>
          SHOP NAME
          <input type='text' placeholder='Enter name of your shop' onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
          SHOP IMAGE URL
          <input type='text' placeholder='Enter name of your shop' onChange={(e) => setImgUrl(e.target.value)}/>
        </label>
        <label>
          LOCATION
          <input type='text' placeholder='Enter Shop Location' onChange={(e) => setLocation(e.target.value)}/>
        </label>

        <Button onClick={() => {
          
          dispatch({
          type: 'ADD_TO_SHOPLIST',
          payload: sampleShop
        });
        clearFields();
        showSample();
      }}
          variant='dark'
          style={{width:'60%', margin:'20px auto'}}
          >
          Join us
        </Button >

        {/* <Button variant='danger' onClick={() => dispatch({
          type: 'REMOVE_FROM_SHOPLIST'
        })}>
          Remove
        </Button> */}
      </div>


    </div>
  )
}
