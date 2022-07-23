import React from 'react'
import bone from '../images/bone.png'

export default function Bone(props)
{
    return(
        <div className={props.resize ? 'bone--resize' : 'bone'}>
        <div className='bone'>
            <img src={bone} alt='' className='bone--img'/>
            <h1 className='bone--aboveText'>
                {props.aboveText}
            </h1>
            <h1 className={props.resize ? 'bone--text--resize' : 'bone--text'}>
                {props.text}
            </h1>
        </div>
        </div>
    )
}