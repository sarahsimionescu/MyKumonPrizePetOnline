import React from 'react'
import Bone from './Bone'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Authenticate(props){
    const navigate = useNavigate();

    const [password,setPassword] = React.useState('')

    const [incorrect, setIncorrect] = React.useState(false)

    function changePassword(event)
    {
        setPassword(event.target.value)
    }

    function login(event)
    {
        event.preventDefault();
        axios.get(process.env.REACT_APP_BACKEND +'/authenticate?password=' + password)
            .then(response => {
                if(response.data.secret === '')
                {
                    setIncorrect(true)
                }else{
                    props.setSecret(response.data.secret);
                    navigate('/main')
                }      
            })
            .catch(() => navigate('/error'));
    }

    return(<div className='main'>
        <Bone text='Authenticate'/>
        <h1>Please ask your kumon instructor to log-in.</h1>
        <form className='form' onSubmit={login}>
                <div className='form--element'>
                    {incorrect && <p className='warning'>Password is incorrect!</p>}
                    <input
                        className='form--text' 
                        type='password'
                        value={password}
                        onChange={changePassword}
                    />
                </div>
                <button className='button' >Log-in</button>
            </form>
    </div>)
}