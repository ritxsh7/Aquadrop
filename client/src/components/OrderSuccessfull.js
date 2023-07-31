import { Dialog } from '@mui/material'
import { BsCheck2Circle } from 'react-icons/bs'
import { CartState } from '../context/Context';
import '../styles/orderDialog.css';

import checkIcon from '../images/checkIcon.png'


import React from 'react'
import { Button } from 'react-bootstrap';

export default function OrderSuccessfull({ order, setOrder, form, setFormState}) {

    const { state: { cart }, dispatch } = CartState();

    const clearCart = () => {
        dispatch({
            type: 'CLEAR_CART',
            payload: {}
        })
    }
    return (
        <Dialog open={order} style={{padding:'30px'}}>
            
            <div className='orderDialog'>
                <img src={checkIcon} className='check-icon'/>
                <h3>Order Successfull</h3>
                <Button variant='primary' onClick={() => {
                        clearCart();
                        setOrder(false);
                        setFormState(false);
                    }}
                    style={{
                        margin:'20px 0 0 0'
                    }}>
                    Go back to cart 
                </Button>
            </div>
        </Dialog>
    )
}
