import React from 'react';
import './GlobalErrorMessage.css';

export const GlobalErrorMessage = props=>{
    return(
    <div class="message-box" style={props.visible?{}:{display:"none"}}>
        <div style={{position:"relative", height:"100%", width:"100%"}}>
            <h2>Error:</h2>
            <p>{props.message}</p>
            <button onClick={()=>props.handleClose()}>+</button>
        </div>
    </div>
    );
};