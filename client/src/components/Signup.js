//styles and comps
import '../styles/Login.css'
import Loader from './Loader';
import SmallLoader from './SmallLoader';
import LoginSticker from '../images/sticker.png';


//store and states
import React, { useState } from 'react'


//connect backend
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





export default function Signup() {

    //setup store
    const navigate = useNavigate();

    //states for signup
    const [name, setName] = React.useState('');;
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading , setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');
    const [pincode, setPincode] = useState(0);

    //signup function
    const handleSignUp = async (e) => {
        setLoading(true);

        if(isNaN(pincode)){
            setLoading(false);
            setError(true);
            setErrMsg('Enter valid Pincode');
            return;
        }

        try{
            const response = await axios.post('http://localhost:8080/api/v1/user/signup',{
                name, email, password, pincode, role : 'Customer',
            })
            console.log(response);
            setSuccess(response.data.message);
            setTimeout(() => {
                setLoading(false);
                navigate('/login')
            }, 3000)
        }catch(err){
            setLoading(false);
            setError(true);
            setErrMsg(err.response.data.message);
        }
    }

    //component
    return (
        <div class="form-info">
            <div className='login-left'>
                <h3>New user?</h3>
                <p>Sign Up to order fresh drinking water and get delivered at your doorsteps.
                </p>
                <img src={LoginSticker}>
                </img>
            </div>

            <form action="">  
                <input type="text" name="name" id="" placeholder="Your Full Name" required onChange={(e) => setName(e.target.value)}/>
                <input type="email" name="email" id="" placeholder="Email Id" required onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" name="password" id="" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                <input type="text" name="pincode" id="" placeholder="Pincode" required onChange={(e) => setPincode(e.target.value)}/>

                <Loader 
                    loading = {loading}
                />

                <input type="button" id="loginup" value='Signup'  onClick={() =>{
                    handleSignUp();
                }} />
                {
                    error &&
                     <p style={{color:'red'}}>{errMsg}</p>
                }
                {
                     success &&
                     <p style={{color:'limegreen', textAlign:'center'}}>
                        {`${success}, Redirecting to Login...`}
                        <SmallLoader/>
                    </p>
                }
                <p className="sign-up">Already a user?
                 <a href="/login" id="signup">
                    Login
                </a>
                </p>
            </form>
            
            </div>
    )
}
