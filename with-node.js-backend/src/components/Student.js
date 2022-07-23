import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

import Calendar from 'react-calendar'
import Back from './Back'
import Bone from './Bone'
import Bar from './Bar'
import PopUp from './PopUp';

import background from '../images/empty-room.jpeg'
import token from '../images/token.png'



export default function Student(){


    const navigate = useNavigate();

    const {username} = useParams();

    const [gif,setGif] = React.useState('')
    const [studentData,setStudentData] = React.useState({
        username:'',
        math:false,
        reading:false,
        startdate: new Date(),
        petname:'',
        pettype:'',
        points:0,
        tokens:0,
        dates:{
            math:[],
            reading:[]
        }
    })

    const [change,setChange] = React.useState(
        {
            changed:false,
            popup:false,
            prevPoints:0,
            prevTokens:0
        }
    )

    const [tab,setTab] = React.useState('')

    function convertToDates(jsonArr,newArr)
    {
        jsonArr.forEach(date => {
            newArr.push({
                date: new Date(date.date),
                bonus:date.bonus
            })
        })
    }


    React.useEffect(function(){
        axios.get(process.env.REACT_APP_BACKEND +'/get/' + username)
            .then(response => {
                var mathdates = []
                var readingdates = []
                convertToDates(response.data.dates.math,mathdates)
                convertToDates(response.data.dates.reading,readingdates)
                setStudentData({
                    username:response.data.username,
                    math:response.data.math,
                    reading:response.data.reading,
                    startdate: new Date(response.data.startdate),
                    petname:response.data.petname,
                    pettype:response.data.pettype,
                    points:response.data.points,
                    tokens:response.data.tokens,
                    dates:{
                        math:mathdates,
                        reading:readingdates
                        
                    }
                })

            })
            .catch(() => navigate('/error'));
            
    },[username,navigate])

    
    React.useEffect(function(){
        if(studentData.pettype.length > 0)
        {
            const randomGif = require('../images/gifs/'+ studentData.pettype.toLowerCase() + "/" +Math.floor(Math.random()*30+1) + '.gif');
            setGif(randomGif)
        }

    },[studentData.pettype])

    

    React.useEffect(function() {
        if(studentData.math){
            setTab('math')
        }else if(studentData.reading){
            setTab('reading')
        }
    },[studentData.math,studentData.reading])

    React.useEffect(function(){
        setChange(function(prev){
            if(!prev.changed)
            {
                return ({
                    ...prev,
                    prevPoints:studentData.points,
                    prevTokens:studentData.tokens
                })
            }else{
                return(prev)
            }
        })
    },[studentData.points,studentData.tokens])



    const backgroundStyle = {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width:'100%',
        height:'100%'
    }


    function tileDisabled({ date, view }) {
        // Disable tiles in month view only
        if (view === 'month') {
            return(date > Date.now() || date < studentData.startdate )
        }
    }

    function tileClassName({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
            if (isComplete(date,tab)) {
                return 'tile--complete';
            }else if (isBonus(date,tab)){
                return 'tile--bonus'
            }else
            {
                return 'tile--blank'
            }
        }
    }



    function isSameDay(dateA, dateB) {
        return(
            dateA.toDateString() === dateB.toDateString()
        )
    }



    function isComplete(date,subject)
    {
        if(typeof studentData.dates[subject] === 'undefined'){
            return false
        }else
        {
            return studentData.dates[subject].some(function(sDate){
                return ( isSameDay(sDate.date,date) && !sDate.bonus)
            })
        }

    }

    function isBonus(date,subject){
        if(typeof studentData.dates[subject] === 'undefined'){
            return false
        }else
        {
            return studentData.dates[subject].some(function(sDate){
                return ( isSameDay(sDate.date,date) && sDate.bonus)
            })
        }
    }

 


    function onClickDay(date){
        if(!change.changed)
        {
            setChange(prev => ({
                ...prev,
                changed:true
            }))
        }
        if(isComplete(date,tab) || isBonus(date,tab)){
            updateRemoveStudentDate(date,tab)
        }else{
            updateAddStudentDate(date,tab)
        }
    }

    function prevDate(date){
        const prev = new Date(date.getTime())
        prev.setDate(date.getDate() -1)
        return prev;
    }

    function nextDate(date){
        const next = new Date(date.getTime())
        next.setDate(date.getDate() +1)
        return next;
    }  

    function compare (itemA,itemB)
    {
        if(itemA.date < itemB.date)
        {
            return -1;
        }else if (itemA.date > itemB.date)
        {
            return 1;
        }
        return 0;
    }




    function updateAddStudentDate(date,tab)
    {

        setStudentData(function(prev){
            const newDate = {
                date:date,
                bonus:false
            }
            var dates = []
            var points = prev.points
            var tokens = prev.tokens
            if(typeof prev.dates[tab] !== 'undefined')
            {
                dates = prev.dates[tab].sort(compare);
            }

            function isDate(date,start=0,end=dates.length-1)
            {
                if(dates.length === 0)
                {
                    return false
                }

                if(start > end){
                    return false;
                }

                let mid=Math.floor((start+end)/2)

                if(isSameDay(dates[mid].date,date))
                {
                    return true
                }

                if(dates[mid].date > date){
                    return isDate(date, start, mid-1)
                }else
                {
                    return isDate(date,mid+1,end)
                }
            }

            
            function findDate(date,start=0,end=dates.length-1)
            {
                if(dates.length === 0)
                {
                    return -1
                }

                if(start > end){
                    return -1;
                }

                let mid=Math.floor((start+end)/2)

                if(isSameDay(dates[mid].date,date))
                {
                    return mid
                }

                if(dates[mid].date > date){
                    return findDate(date, start, mid-1)
                }else
                {
                    return findDate(date,mid+1,end)
                }
            }

        




            if(!isDate(date))
            {
                dates.push(newDate)
                dates = dates.sort(compare);
                points += 10
            }

              

            var start = new Date(date.getTime())


            while(isDate(prevDate(start)))
            {
                start.setDate(start.getDate()-1)
            }

            function applyBonus(start)
            {
                var counter = 0;
                var index = findDate(start)
                while(counter < 8 && index >= 0)
                {
                    if(dates[index].bonus)
                    {
                        dates[index].bonus = false;
                        points -= 5
                    }
                    index = findDate(nextDate(dates[index].date))
                    counter++;
                }
                if(counter >= 7)
                {
                    counter = 0;
                    index = findDate(start)
                    while(counter < 7 && index >= 0)
                    {
                        if(!dates[index].bonus)
                        {
                            dates[index].bonus = true;
                            points += 5
                        }
                        index = findDate(nextDate(dates[index].date))
                        counter++;
                    }
                    if(index  >= 0)
                    {
                        applyBonus(dates[index].date)
                    }
                }else if (counter < 7)
                {
                }
            }

            applyBonus(start)

            if(points >= 1000)
            {
                tokens++
                points-= 1000
            }

            if(points < 0)
            {
                points = 0
            }

            return({
                ...prev,
                tokens:tokens,
                points:points,
                dates:{
                    ...prev.dates,
                    [tab]:dates
                }
            })
            
        })


    }

    function updateRemoveStudentDate(date,tab)
    {
        setStudentData(function(prev){

            var dates = []
            var points = prev.points
            var tokens = prev.tokens
            if(typeof prev.dates[tab] !== 'undefined')
            {
                
                dates = prev.dates[tab].sort(compare);
                
            }

            function isDate(date,start=0,end=dates.length-1)
            {
                if(dates.length === 0)
                {
                    return false
                }

                if(start > end){
                    return false;
                }

                let mid=Math.floor((start+end)/2)

                if(isSameDay(dates[mid].date,date))
                {
                    return true
                }

                if(dates[mid].date > date){
                    return isDate(date, start, mid-1)
                }else
                {
                    return isDate(date,mid+1,end)
                }
            }

            
            function findDate(date,start=0,end=dates.length-1)
            {
                if(dates.length === 0)
                {
                    return -1
                }

                if(start > end){
                    return -1;
                }

                let mid=Math.floor((start+end)/2)

                if(isSameDay(dates[mid].date,date))
                {
                    return mid
                }

                if(dates[mid].date > date){
                    return findDate(date, start, mid-1)
                }else
                {
                    return findDate(date,mid+1,end)
                }
            }

            dates = dates.filter(item => {
                var keep = !isSameDay(item.date,date)
                if(!keep){
                    if(item.bonus){
                        points -=15;
                    }else{
                        points -= 10;
                    }
                    
                }
                return(keep)
            })
            

            var start = new Date(date.getTime())

            if(isDate(nextDate(start)))
            {
                applyBonus(nextDate(start))
            }

            if(isDate(prevDate(start)))
            {
                while(isDate(prevDate(start)))
                {
                    start.setDate(start.getDate()-1)
                }
                applyBonus(start)
            }

            function applyBonus(start)
            {
                var counter = 0;
                var index = findDate(start)
                while(counter < 8 && index >= 0)
                {
                    if(dates[index].bonus)
                    {
                        dates[index].bonus = false;
                        points -= 5
                    }
                    index = findDate(nextDate(dates[index].date))
                    counter++;
                }
                if(counter >= 7)
                {
                    counter = 0;
                    index = findDate(start)
                    while(counter < 7 && index >= 0)
                    {
                        if(!dates[index].bonus)
                        {
                            dates[index].bonus = true;
                            points += 5
                        }
                        index = findDate(nextDate(dates[index].date))
                        counter++;
                    }
                    if(index  >= 0)
                    {
                        applyBonus(dates[index].date)
                    }
                }else if (counter < 7)
                {
                }
            }

            
            if(points >= 1000)
            {
                tokens++
                points-= 1000
            }

            if(points < 0)
            {
                points = 0
            }
            
            
            return({
                ...prev,
                tokens:tokens,
                points:points,
                dates:{
                    ...prev.dates,
                    [tab]:dates
                }
            })
            
        })

        
        

    }


    
    
    

   

    function handleDone(event)
    {
        event.preventDefault()
        axios.post(process.env.REACT_APP_BACKEND +'/update/' + username,studentData)
        .then((response) => {
            console.log(response.data);
          }, (error) => {
            navigate('/error')
          });
        setChange(prev => ({
            ...prev,
            popup:true
        }))
    }



    return(
        <div className='student' style={backgroundStyle} >
            {(studentData.petname.length > 0 && tab.length > 0) ?
            <div>
                
                <Back
                onClick={() => navigate('/')}
                disabled={change.changed}
                />
                
                <div className='student--stats'>
                <div className='student--stats--token'>
                        <h1 > {username}</h1>
                        <img src={token} className='student--stats--token--icon' alt='Token'/>
                        <h1 className='student--stats--token--header'>{studentData.tokens}</h1>
                    </div>
                    <Bar points={studentData.points}/>
                    <Bone text={studentData.petname} resize={true}/>
                    
                    
                </div>
                
                <img className='student--pet' src={gif} alt="Cute pet."/>
                <div className='student--calendarbox'>
                    <div className='student--calendarbox--tabs'>
                        <button 
                        className={tab === 'math' ? 'student--calendarbox--tabs--math' : 'student--calendarbox--tabs--grey'}
                        disabled={!studentData.math && !change.popup}
                        onClick={() => setTab('math')}
                        >Math</button>
                        <button
                        className={tab === 'reading' ? 'student--calendarbox--tabs--reading' : 'student--calendarbox--tabs--grey'}
                        disabled={!studentData.reading}
                        onClick={() => setTab('reading')}
                        >Reading</button>
                    </div> 
                    <div className='student--calendarbox--background'>
                        <div className={tab === 'math' ? 'student--calendarbox--background--border--math': 'student--calendarbox--background--border--reading'}>
                        <Calendar
                        tileDisabled={tileDisabled}
                        tileClassName={tileClassName}
                        onClickDay={onClickDay}
                        />
                        <button
                        className={tab === 'math' ? 'student--calendarbox--background--border--button--math': 'student--calendarbox--background--border--button--reading'}
                        onClick={handleDone}
                        disabled={!change.changed && !change.popup}
                        >Done</button> 
                        </div> 
                        
                    </div>
                </div>
                {change.popup &&
                <PopUp 
                points={(studentData.tokens-change.prevTokens)*1000 + studentData.points-change.prevPoints}
                tokens={(studentData.tokens-change.prevTokens)}
                pettype={studentData.pettype}
                />}
            </div>
            :
            <h1>Page is loading, please wait.</h1>
            }      
        </div>
    )
}

