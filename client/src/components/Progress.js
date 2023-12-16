import zIndex from '@mui/material/styles/zIndex'
import React from 'react'

const Progress = () => {
  return (
    <div className='progress'
        style={{
            position:'fixed',
            top:'0',
            right:'50%',
            height:'fit-content',
            color:'white',
            width:'90vw',
            margin:'0 auto',
            zIndex:'10',
            padding:'40px 10px',
            backgroundColor:'rgb(1,1,1,0.8)',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            height:'fit-content',
            transform:'translate(50%, 0)'
        }}
    >
        <h1
            style={{
                textAlign:'center',
            }}
        >
            Hello there !
        </h1>
        <h4 style={{color:'dodgerblue', textAlign:'center'}}>This site is currently under development! Please stay tuned.</h4>
        <button 
            className='explore' 
            style={{marginTop:'1rem'}}
            onClick={() => {
                window.open("https://my-portfolio-7f1ec.web.app/", "_self");
            }}
        >
            Close window
        </button>
    </div>
  )
}

export default Progress