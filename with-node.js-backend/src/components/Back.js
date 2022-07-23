import React from 'react'

export default function Back(props)
{
    return(
        <button
        className='back' onClick={props.onClick}
        disabled={props.disabled}
        >
           <h1>  {'<'} Back </h1>
        </button>
    )
}