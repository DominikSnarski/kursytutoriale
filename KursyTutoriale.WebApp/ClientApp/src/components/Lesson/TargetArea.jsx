import React from 'react';
import {
    Input
} from 'reactstrap';
import { useDrop } from 'react-dnd'
import './style.css';

function TargetArea(props) {

    const [{ isOver }, drop] = useDrop({
        accept: 'textarea',
        drop: () => props.addTextField(),
    })
    
    return (
        <div ref={drop} className="working-area">
        </div>
    )
}

export default TargetArea;
