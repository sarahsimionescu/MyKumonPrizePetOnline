import React from 'react'

//import listicon from '../images/list-icon.png'


import Paws from './Paws'
import Bone from './Bone'

import { useNavigate } from 'react-router-dom'



export default function Main()
{

    const navigate = useNavigate();


    return(
        <div className='main' >
            <Paws/>
            {/*<ImageButton src={listicon}/>*/}
            <Bone text='PRIZE PET' aboveText='My Grantham Plaza Kumon' fontSize={8} boneSize={100}/>
            <div className='main--buttonContainer'>
                <button className='button' onClick={() => navigate('/log-in')}>Log-in</button>
                <button className='button' onClick={() => navigate('/sign-up')}>Sign-up</button>
            </div>
        </div>
    )
}