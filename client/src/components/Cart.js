import React, { useEffect, useState } from 'react'
import { Dialog, styled } from '@mui/material';
import '../styles/cart.css'
import CartProduct from './cartProduct';
import { CartState } from '../context/Context';
import { div, ListGroup, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import PaymentForm from './PaymentForm';


export default function Cart({ cartState, setCartState }) {

    const [formState, setFormState] = useState(false);

    const openForm = () => {
        setFormState(true);
    }

    const closeCart = () => {
        setCartState(false);
    }

    const { state: { cart }, dispatch } = CartState();

    const [total, setTotal] = useState();

    useEffect(() => {
        setTotal(
            cart.reduce((acc, curr) => acc + Number(curr.mrp) * curr.qty, 0)
        );
    }, [cart]);

    const cartItems = cart.map(prod => (
        <ListGroup.Item key={prod.id} className='cart-item'>
            <Image src={prod.img} alt={prod.name} style={{ width: '15%' }} fluid rounded />

            <div className='m-5'>
                <h3>{prod.name}</h3>
                <h4>₹ {prod.mrp}</h4>
            </div>

            <Form.Control
                as="select"
                value={prod.qty}
                style={{ width: '10%', marginLeft: 'auto' }}
                onChange={(e) =>
                    dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                            id: prod.id,
                            qty: e.target.value,
                        },
                    })
                }
            >
                {[...Array(prod.inStock).keys()].map((x) => (
                    <option key={x + 1}>{x + 1}</option>
                ))}
            </Form.Control>

            <Button
                type="button"
                variant="danger"
                style={{ color: 'white', marginLeft: '4%' }}
                onClick={() =>
                    dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                    })
                }
            >
                <AiFillDelete fontSize="20px" />
            </Button>

        </ListGroup.Item>
    )
    )

    return (
        <Dialog open={cartState} PaperProps={{ sx: { maxWidth: 'unset' } }} onClose={() => closeCart()}>
            <div className="home">


                {
                    cart.length > 0 ?
                        <div className='product-container'>
                           {cartItems}
                        </div>
                        :
                        <h1 style={{ textAlign: 'center', marginTop: '25%', width:'60vw' }}>No items in cart !!!</h1>
                }



                <div className="filters summary">
                    <h3 className="title">Subtotal ({cart.length}) items</h3>
                    <h3 style={{ fontWeight: 700, fontSize: 20, color: 'white' }}>Total : ₹{total}</h3>
                    <Button type="button" variant='dark' disabled={cart.length === 0} onClick={() => openForm()}>
                        Proceed to Checkout
                    </Button>

                </div>


            </div>

            <PaymentForm form={formState} setFormState={setFormState} cartState={cartState} setCartState={setCartState} />
        </Dialog>
    )
}