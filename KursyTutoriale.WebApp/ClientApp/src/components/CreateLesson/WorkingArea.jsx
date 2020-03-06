import React from 'react';
import { Input } from 'reactstrap';
import { useDrop } from 'react-dnd';
import './style.css';

function WorkingArea(props) {
  const [, drop] = useDrop({
    accept: 'textarea',
    drop: () => props.addTextField(),
  });

  return (
    <div ref={drop} className="working-area">
      {props.items.map((item, i) => (
        <div key={i}>
          {item.type === 'textarea' && <Input type="textarea" />}{' '}
        </div>
      ))}
    </div>
  );
}

export default WorkingArea;
