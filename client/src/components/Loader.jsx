import React from 'react'
import PuffLoader from "react-spinners/PuffLoader";


const spinnerCss = {
    position: "fixed",
    top : '50%',
    right:'50%',
    translate : '50%',
}

const Loader = (props) => {
  return (
    <div>
        <PuffLoader 
            color='#1DA1F2'
            loading = {props.loading}
            cssOverride={spinnerCss}
            size={150}
        />
    </div>
  )
}

export default Loader