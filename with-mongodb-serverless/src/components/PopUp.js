import React from 'react'
import Bone from './Bone'
import { useNavigate } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from "react-confetti";

export default function PopUp(props)
{
    const navigate = useNavigate();

    const { width, height } = useWindowSize()
    
    const [text] =React.useState(statement(props.points,props.tokens))

    const [gif, setGif ] = React.useState([])
    
    React.useEffect(function(){
        if(props.pettype.length > 0)
        {
            const randomGif = require('../images/gifs/congrats-'+ props.pettype.toLowerCase() + "/" +Math.floor(Math.random()*4+1) + '.gif');
            setGif(randomGif)
        }

    },[props.pettype])

    function statement(points,tokens)
    {
        var text = ''
        if(points > 0 || tokens > 0)
        {
            text=text.concat('You have earned')
        }
        if(points > 0){
            text = text.concat(' '+ points + ' points')
        }
        if(points > 0 && tokens > 0)
        {
            text = text.concat(' and')
        }
        if(tokens === 1){
            text = text.concat(' '+tokens + ' token')
        }else if(tokens > 1)
        {
            text = text.concat(' '+tokens + ' tokens')
        }
        if(points > 0 || tokens > 0)
        {
            text=text.concat('!')
        }
        return(text)
    }

    

    return(
        <div className='popup'>
            <Confetti
            width={width}
            height={height}
            />
        <div className='popup--background'>
            <div  className='popup--background--border'>
                <Bone text="Congratulations!" resize={false} />
                <img
                className='popup--background--border--gif'
                src={gif}
                alt='Cute pet.'
                />
                <p className='popup--background--border--text'>{text}</p>
                <button
                className='button'
                onClick={() => navigate('/main')}
                >Done</button>
            </div>
        </div>
        </div>
    )
}