import React from 'react'

export default function Bar (props){

    const outerStyle = {
        height: 30,
        width: '40%',
        background: '#F2F2F2',
        borderRadius: 50,
        border:'solid 5px #FFFFFF',
        margin: '2%'
    }

    const innerStyle = {
        height: '100%',
        width: `${Math.round(props.points/10)}%`,
        background: 'linear-gradient(90deg, #7EF4B4 3.6%, #8DFFFF 95.32%)',
        borderRadius: 'inherit',
    }

    return(
    <div style={outerStyle}>
        <div  style={innerStyle}>
        </div>
    </div>
    )
    

}