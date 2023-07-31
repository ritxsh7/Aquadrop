import React from 'react'
import {auth} from '../Config/Config'

export default function Login(props) {

    const showSignUp = () => {
        const state = props.accountInitialstate;
        {props.toggleAccount(state.signup)}
    }

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = () =>{
        console.log(email, password)
    }

  return (
    <div class="form-info">
            <h2 id="change" style={{color:'dodgerblue', textAlign:'center'}}>Login</h2>
            <form action="">
                <input type="email" name="" id="" placeholder="Email Id" required onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" name="" id="" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                <p><a href="#" id="forgot">Forgot Password</a></p>
                <input type="button" id="loginup" value="Login" onClick={handleLogin}/>
            </form>
            <p class="sign-up">Not a member?<a href="#" id="signup" onClick={() => showSignUp()}>Sign up</a></p>

        </div>
  )
}
