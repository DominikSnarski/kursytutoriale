import React from 'react';
import { useDrop } from 'react-dnd';
import './style.css';

function TargetArea(props) {
  const [, drop] = useDrop({
    accept: 'textarea',
    drop: () => props.addTextField(),
  });

  return <div ref={drop} className="working-area"></div>;
}

export default TargetArea;
