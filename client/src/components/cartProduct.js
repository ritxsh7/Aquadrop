import React from 'react'

export default function CartProduct(props) {
    return (
        <div class="box">
            <img src="1.jpg" />
            <div class="content">
                <h3>{props.name}</h3>
                <h4>{props.mrp}</h4>
                <p class="unit">Quantity: {props.n}</p>
                <p class="btn-area"><i aria-hidden="true" class="fa fa-trash"></i> <span class="btn2">Remove</span></p>
            </div>
        </div>
    )
}