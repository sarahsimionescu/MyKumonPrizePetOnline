import React from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

import dogoption from '../images/dog-option.png'
import catoption from '../images/cat-option.png'

import Bone from './Bone'
import Back from './Back'

import { useNavigate } from 'react-router-dom'

export default function Signup(){

    const navigate = useNavigate();

    const[usernames,setUsernames] = React.useState([])


    const [studentData,setStudentData] = React.useState({
        username: '',
        startdate: new Date(),
        petname: '',
        pettype: 'Dog',
        math:false,
        reading:false,
    })

    const [unique, setUnique] = React.useState(false)

    const [button, setButton] = React.useState(true)

    React.useEffect(function(){
        if(usernames.length > 0)
        {
            setUnique(!usernames.some(item => item.username === studentData.username))

        }else
        {
            setUnique(true)
        }
    },[studentData.username,usernames])

    React.useEffect(function(){
        axios.get(process.env.REACT_APP_BACKEND +'/getUsernames')
            .then(response => {
                setUsernames(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    },[])

    React.useEffect(function(){

        if(studentData.username.length > 0 &&
            studentData.petname.length>0 &&
            studentData.petname.length<11 &&
            unique === true &&
            (studentData.math === true ||
            studentData.reading === true))
            {
                setButton(false)
            }else{
                setButton(true)
            }
    }, [studentData,unique])

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


    function changeStudent(event)
    {
        setStudentData(function(prev){
            return({...prev,
                [event.target.name]:event.target.type === 'checkbox' ?
                event.target.checked : event.target.value
            })
        })
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

    function changeStudentDate(date)
    {
        setStudentData(function(prev){
            return({...prev,startdate:date})
        })
    }

    function changeStudentPetName(event)
    {
        setStudentData(function(prev){
            if(event.target.value.length < 11)
            {
                return({...prev,petname:event.target.value})
            }else
            {
                return(prev)
            }
        })
    }

    function addStudent(event)
    {
        event.preventDefault();

        const student = {
            username: studentData.username,
            startdate: studentData.startdate,
            math: studentData.math,
            reading: studentData.reading,
            petname: studentData.petname,
            pettype: studentData.pettype
        }

        axios.post(process.env.REACT_APP_BACKEND +'/add', student)
           .then(res => console.log(res.data));

        navigate('/')

    }

    return(
        <div className='page'>
            <Back onClick={() => navigate('/')}/>
            <Bone text='Sign-up' resize={true} />
            <form className='form' onSubmit={addStudent}>
                <div className='form--element'>
                    <p>Enter the student's first name and last initial:</p>
                    <p className='requirements'> (must be unique, all lowercase, 20 characters max)</p>
                    {!unique && <p className='warning'> (username is not unique)</p>}
                    <input
                        className='form--text' 
                        type='text'
                        placeholder='Student Name'
                        name='username'
                        value={studentData.username}
                        onChange={changeStudentName}
                    />  
                </div>
                <div className='form--element'>
                    <p>Select one or both subjects:</p>
                    {studentData.math === false && studentData.reading === false && <p className='warning'>(you must check at least one)</p>}
                    <div className='form--checkboxcontainer'>
                        <input
                            className='form--checkbox'
                            type="checkbox" 
                            name='math'
                            checked={studentData.math}
                            onChange={changeStudent}
                        />
                        <h1 className='form--checkboxtext'>
                            Math
                        </h1>
                        <input
                            className='form--checkbox'
                            type="checkbox" 
                            name='reading'
                            checked={studentData.reading}
                            onChange={changeStudent}
                        />
                        <h1 className='form--checkboxtext'>
                            Reading
                        </h1>
                    </div>
                </div>
                <div className='form--element'>
                    <p>The first date the student began tracking homework:</p>
                    <div >
                        <DatePicker
                            className='datepicker'
                            selected={studentData.startdate}
                            onChange={changeStudentDate}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </div>
                <div className='form--element'>
                    <p>Select one pet:</p>
                    <div className='form--petcontainer'>
                        <div className='form--petcontainer--pet'>
                            <img className='form--petcontainer--pet--image' src={dogoption} alt='Cartoon of a Cute Dog'/>
                            <div className='form--petcontainer--pet--buttoncontainer'>
                                <input 
                                    className='form--petcontainer--pet--buttoncontainer--button'
                                    type="radio"
                                    name="pettype"
                                    value="Dog"
                                    checked={studentData.pettype === "Dog"}
                                    onChange={changeStudent}
                                />
                                <h1>Dog</h1>
                                
                            </div>
                        </div>
                        <div className='form--petcontainer--pet'>
                            <img className='form--petcontainer--pet--image' src={catoption} alt='Cartoon of a Cute Cat'/>
                            <div className='form--petcontainer--pet--buttoncontainer'>  
                                <input 
                                    className='form--petcontainer--pet--buttoncontainer--button'
                                    type="radio"
                                    name="pettype"
                                    value="Cat"
                                    checked={studentData.pettype === "Cat"}
                                    onChange={changeStudent}
                                />
                                <h1>Cat</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form--element'>
                    <p>Enter the pet's name:</p>
                    <p className='requirements'> (10 characters max)</p>
                    {studentData.petname.length > 10 && <p className='warning'> (must be 10 characters or less)</p>}
                    <input
                        className='form--text' 
                        type='text'
                        placeholder='Pet Name'
                        name='petname'
                        value={studentData.petname}
                        onChange={changeStudentPetName}
                    />
                </div>
                <button className='button' disabled={button}>Sign-up</button>
            </form>
        </div>
    )
}