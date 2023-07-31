import {Dialog, styled} from '@mui/material';
import React from 'react';
import {authenticateSignUp} from '../service/api'
import '../styles/Login.css'
// import useState from  'react'

import Signup from './Signup';
import Login from './Login';

const DialogStyles = {
    // backgroundColor: 'white'
}

const styledDialog = styled(Dialog)`
    background-color: rgb(0,0,0,0.65);
`

const accountInitialstate = {
    login : {
        view : 'login'
    },
    signup : {
        view : 'signup'
    }
};

const signUpInitialstate = {
    firstName : '',
    lastName : '',
    email : '',
    password : '',
}

export default function User({open, setOpen}) {


    const [account , toggleAccount ] = React.useState(accountInitialstate.login);
    const [signUp, setSignup] = React.useState(signUpInitialstate);

    const handleClose = ()=> {
        setOpen(false);
        toggleAccount(accountInitialstate.login)
    }

  return (
    <Dialog open={open} onClose ={handleClose} className='loginDialog' PaperProps={{sx : {maxWidth: 'unset'}}} style={DialogStyles}>
        {
            account.view === 'login' ?

            < Login 
              toggleAccount = {toggleAccount}
              accountInitialstate = {accountInitialstate}
            />
            :
            <Signup 
                toggleAccount = {toggleAccount}
                accountInitialstate = {accountInitialstate}
                signUp = {signUp}
                setSignup= {setSignup}
                setOpen = {setOpen}
            />
        }
        
    </Dialog>
  )
}
