import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


import Bone from './Bone'
import Back from './Back'



export default function Login(){

    const navigate = useNavigate();

    const [studentData,setStudentData] = React.useState({
        username: '',
    })

    const [usernames,setUsernames] = React.useState([])

    const [button,setButton] = React.useState(true)

    React.useEffect(function(){
        if(usernames.length > 0)
        {
            setButton(!usernames.some(item => item.username === studentData.username))

        }else
        {
            setButton(true)
        }
    },[studentData.username,usernames])

    React.useEffect(function(){
        axios.get(process.env.REACT_APP_BACKEND +'/getUsernames?secret=' + process.env.REACT_APP_SECRET)
            .then(response => {
                setUsernames(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    },[])

    function validCharacters(string){
        if(string === '')
        {
            return true
        }
        else if (string.match(/^[A-Za-z- ]+$/) === null) { 
            return false
        }else{
            return true
        }
    }


    function changeStudentName(event)
    {
        
        setStudentData(function(prev){
            if(event.target.value.length < 21 && validCharacters(event.target.value))
            {
                return({...prev,username:event.target.value.toLowerCase()})
            }else
            {
                return(prev)
            }
            
        })
    }

    function login(event)
    {
        event.preventDefault();
        navigate('/' + studentData.username)
    }

    return(
        <div className='page'>
            <Back onClick={() => navigate('/')}/>
            <Bone text='Log-In' resize={true} />
            
            <form className='form' onSubmit={login}>
                <div className='form--element'>
                    <p>Enter the student's first name and last initial:</p>
                    <input
                        className='form--text' 
                        type='text'
                        placeholder='Student Name'
                        name='username'
                        value={studentData.username}
                        onChange={changeStudentName}
                    />
                </div>
                <button className='button' disabled={button}>Log-in</button>
            </form>
            
        </div>
    )
}