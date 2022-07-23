import React from 'react'

export default function ImageButton(props){
    return(
        <button className='imageButton'>
            <img className='imageButton--img' src={props.src} alt="" onClick={props.onClick} />
        </button>
    )
}