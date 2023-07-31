import '../styles/ProductCard.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import { CartState } from '../context/Context';

export default function ProductCard(props) {

  const [count, setCount] = React.useState(props.n)

  const upCounter = () => {
    setCount(count + 1);
  }

  const downCounter = () => {
    setCount(count - 1);
  }

  const { state: { cart }, dispatch } = CartState();

  return (
    <div className='productCard'>
      <img className='productImg' src={props.img} alt=''>
      </img>
      <div className='productCardStats'>
        <h3 style={{ marginTop: '0px', fontSize: '1.2rem' }}>{props.name}</h3>
        <p>{props.qty}</p>
        <h3 style={{ marginTop: '10px !important'  }}>₹ {props.mrp}</h3>

        <div className='shopTabs'>

          {
            cart.some(p => p.id === props.id) ?
              <Button variant='danger' onClick={() => {
                dispatch({
                  type : 'REMOVE_FROM_CART',
                  payload : props
                })
              }}
              style={{backgroundColor:'red'}}
              > 
                  Remove from cart</Button>
        :
        <Button onClick={() => {
          dispatch({
            type: 'ADD_TO_CART',
            payload: props
          })
        }}>Add to cart</Button>
        }

        {/* <div className='counter'>
            <button className='minus-Counter' onClick={downCounter}><p>-</p></button>
            <h4 style={{ lineHeight: '2' }}>{count}</h4>
            <button className='plus-Counter' onClick={upCounter}><p>+</p></button>
          </div> */}
      </div>
    </div>
    </div >
  )
}
