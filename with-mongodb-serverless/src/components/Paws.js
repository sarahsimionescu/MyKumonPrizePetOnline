import React from 'react'
import paw from '../images/paw.png'

export default function Paws()
{
    return(
        <div className='paws'>
            <img className='paws--paw1' src={paw} alt=''/>
            <img className='paws--paw2' src={paw} alt=''/>
        </div>
    )
}