import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader';

const SmallLoader = () => {
  return (
    <div>
        <SyncLoader 
            size={15}
            loading= {true}
            color='#1DA1F2'
        />
    </div>
  )
}

export default SmallLoader