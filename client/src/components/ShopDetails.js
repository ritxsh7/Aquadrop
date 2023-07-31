

import React from 'react'
import { useParams } from 'react-router-dom'

//components
import ShopDisplay from './ShopDisplay';
import ProductCard from './productCard';
import ShopArray from '../static/data';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import '../styles/ShopDetails.css';
import Header from './Header';
import { CartState } from '../context/Context';


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


export default function ShopDetails() {

  const { id } = useParams();
  // console.log(id);

  const {state : {shops, products}, dispatch} = CartState();
  console.log(shops);
  console.log(products);

  const [counter , setCounter] = React.useState(1);

  const productList = products[id - 1].map(product => (
    <ProductCard
      count={counter}
      id={id}
      {...product}
    />
  ))

    const currentShop = shops[id - 1];

  return (

    <div className='shopDetailsWrapper'>

      <ShopDisplay 
          key = {currentShop.key}
          {...currentShop}
      />

      <h1 style={{ textAlign: 'center', fontSize: '50px', margin: '50px 0px' }}>Related Products</h1>

      <div className='productsCarousel'>
        <Carousel
          responsive={responsive}
          swipeable={false}
          draggable={false}
          autoPlay={false}
          infinite={true}
        >
          {productList}
        </Carousel>
      </div>
    </div>
  )
}
