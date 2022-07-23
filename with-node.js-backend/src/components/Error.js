import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Error(){
    const navigate = useNavigate();

    return(
        <div className='error' >
            <p>An error occured.</p>
            <button
            className='button'
            onClick={() => navigate('/')}>Return Home</button>
        </div>
    )
}