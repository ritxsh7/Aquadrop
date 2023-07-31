import '../styles/paymentform.css'
//images
import img1 from '../images/card1.png'
import img2 from '../images/card2.png'
import { Dialog } from '@mui/material'

import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { CartState } from '../context/Context'
import OrderSuccessfull from './OrderSuccessfull'

export const PaymentForm = ({form, setFormState}) => {

    

    const orderSuccessfull = () => {
        setOrder(true);
    }

    const [order, setOrder] = useState(false);


    return (

        <Dialog open={form} PaperProps={{ sx: { maxWidth: 'unset' } }} onClose={() => setFormState()}>

            <div class="container">
                <div class="left">
                    <h3>BILLING ADDRESS</h3>
                    <form>
                        Full name
                        <input type="text" name="" placeholder="Enter name" />
                        Email
                        <input type="text" name="" placeholder="Enter email" />
                        Address
                        <input type="text" name="" placeholder="Enter address" />
                        City
                        <input type="text" name="" placeholder="Enter City" />
                        <div id="zip">
                            <label>
                                <select>
                                    <option>Choose Locality..</option>
                                    <option>Sant Tukaram Nagar</option>
                                    <option>Mahesh Nagar</option>
                                    <option>Vallabh Nagar</option>
                                    <option>Pimpri Colony</option>
                                </select>
                            </label>
                        </div>
                    </form>
                </div>
                <div class="right">
                    <h3>PAYMENT</h3>
                    <form>
                        Accepted Cards <br />
                        <img src={img1} width={'120px'}/>
                        <img src={img2} width={'60px'} style={{height:'43px', position:'relative', left:'4px', top:'-3px'}}/>
                        <br /><br />

                        Credit card number
                        <input type="text" name="" placeholder="Enter card number" />

                        Exp month
                        <input type="text" name="" placeholder="Enter Month" />
                        <div id="zip">
                            <label>
                                <select style={{marginTop:'12px', marginRight:'9px'}}>
                                    <option >Exp Year</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                </select>
                            </label>
                            <label>
                                CVV
                                <input type="number" name="" placeholder="CVV" />
                            </label>
                        </div>
                    </form>
                    <Button variant='success' className='w-100' onClick={() => {
                        orderSuccessfull();
                    }}>
                        Pay Now
                    </Button>
                </div>
            </div>
            <OrderSuccessfull order={order} setOrder={setOrder} form={form} setFormState={setFormState}/>
        </Dialog>
    )
}

export default PaymentForm;
