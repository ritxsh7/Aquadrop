import { Link } from "react-router-dom";
import { useState } from "react";
import cartimg from '../images/cart.png'
import { Badge, Button, Dropdown } from "react-bootstrap";
import { CartState } from "../context/Context";
import '../styles/cartDialog.css';
//components
import User from "./User.js"
import Cart from './Cart.js'
import { AiFillDelete } from "react-icons/ai";
import PaymentForm from "./PaymentForm";
import {FaGreaterThan} from 'react-icons/fa'

function Navbar() {

    const [open, setOpen] = useState(false);
    const [cartState, setCartState] = useState(false);

    const openDialog = () => {
        setOpen(true);
    }

    const openCart = () => {
        setCartState(true);
    }

    
    const {user : {user}} = CartState();

    const { state : { cart }, dispatch } = CartState();

    

    return (
        <div className='navbar-const'>
            <ul>
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/#about' >About Us</Link></li>
                <li>

                    {
                        user !== ''?
                        <a>
                        {`Hello, ${user} !`}
                        </a>
                        :
                        <a onClick={() => openDialog()}>
                        Login | Sign Up
                        </a>
                    }
                    
                    
                </li>
                <li><Link to='/add-products'>Become a seller <span><FaGreaterThan/></span> </Link></li>
                <li>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: 'black', border: 'none'}}>
                            <img src={cartimg} style={{ width: '30px', marginBottom: '3px' }}></img>
                            <Badge bg='danger' style={{ marginLeft: '10px' }}>{cart.length}</Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ minWidth: '370px', backgroundColor:'black', color:'white' }}>

                            {cart.length > 0 ?
                                <>
                                    {cart.map((prod) => (
                                        <span className="cartitem" key={prod.id}>
                                            <img
                                                src={prod.img}
                                                className="cartItemImg"
                                                alt={prod.name}
                                            />
                                            <div className="cartItemDetail">
                                                <span>{prod.name}</span>
                                                <span>₹ {prod.mrp}</span>
                                            </div>
                                            <AiFillDelete
                                                fontSize="20px"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: prod,
                                                    })
                                                }
                                            />
                                        </span>
                                    ))}
                                </>
                                :
                                <h4 style={{textAlign:'center'}}>  Cart is empty !!!</h4>
                            }

                        <Button variant="success" className="go-to-cart" onClick={()=>openCart()}>
                            Go to cart
                        </Button>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
            <User open={open} setOpen={setOpen} />
            <Cart cartState={cartState} setCartState={setCartState}/>
        </div>
    )

}
export default Navbar;