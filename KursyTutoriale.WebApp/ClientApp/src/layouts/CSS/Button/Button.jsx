import React from 'react';
import './Button.css';

export const Button = (props) => {
  return (
    <div
      className="button text-center"
      style={{
        background: props.color,
        width: props.width,
        height: props.height,
      }}
    >
      <button style={{ background: 'transparent', border: 0 }}>
        <a href={props.link} onClick={props.onClick}>
          {props.text}
        </a>
      </button>
    </div>
  );
};

export default Button;
