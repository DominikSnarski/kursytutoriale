import React, {useState} from 'react';
import {
    Input
} from 'reactstrap';
import { useDrop } from 'react-dnd'
import './style.css';

function WorkingArea(props) {

    const [{ isOver }, drop] = useDrop({
        accept: 'textarea',
        drop: () => props.addTextField(),
    })
    console.log(props.items);


    return (
        <div ref={drop} className="working-area">
            {props.items.map(item =>
                <div>
                    {item.type == 'textarea' && <Input type='textarea'/>}{' '}
                </div>)}
        </div>
    )
}

export default WorkingArea;
