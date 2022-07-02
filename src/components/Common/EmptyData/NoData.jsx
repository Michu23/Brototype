import React from 'react'
import Img from './NoData.svg'

const NoData = ({message}) => {
  return (
    <>
    <div className='d-flex justify-content-center mt-5'>
        <img src={Img} alt="" className='mt-3' width="30%" />
        
    </div>
    <h1 className='text-center mt-5'>{message}</h1>
    </>
  )
}

export default NoData