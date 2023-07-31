import React from 'react'
import { auth , fs} from '../Config/Config';
import { CartState } from '../context/Context';

import '../styles/Login.css'


export default function Signup({toggleAccount, accountInitialState, signUp, setSignup, setOpen}) {

    //states for signup
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('')
    const [successMsg, setSuccessMsg] = React.useState('')

    const { user : {user} , dispatchUser} = CartState();

    const handleSignUp = (e) => {

    }

    return (
        <div class="form-info">
            <h2 style={{color:'dodgerblue', textAlign:'center'}} >Sign Up</h2>
            <form action="">  
                <input type="text" name="firstName" id="" placeholder="First Name" required onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" name="lastName" id="" placeholder="Last Name" required onChange={(e) => setLastName(e.target.value)}/>
                <input type="email" name="email" id="" placeholder="Email Id" required onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" name="password" id="" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                <input type="button" id="loginup" value="Sign Up" onClick={() =>{
                    setOpen(false);
                    handleSignUp();
                    dispatchUser({
                        type: 'ADD_USER',
                        payload : firstName
                    })
                }} />
            </form>
            
            </div>
    )
}
