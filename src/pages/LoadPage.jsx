import React from 'react'

const LoadPage = () => {
    return (
        // <div className='h-100 w-100'>
        <div className='d-flex bg-secondary justify-content-center align-items-center'
            style={{ opacity: 0.6, zIndex: 0, height: "100%", width: "100%", position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
            <h1 className='fw-bold' style={{zIndex:1}}>Loading...</h1>
        </div>
        // </div>
    )
}

export default LoadPage
