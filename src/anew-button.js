import React from 'react'

export default function Anew (props){
    return(
        <button className = 'anew' onClick = {()=>props.onClick()}>Anew
        </button>
    );
}