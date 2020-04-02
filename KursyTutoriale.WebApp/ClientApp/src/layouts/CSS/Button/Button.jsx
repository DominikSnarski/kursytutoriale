import React from 'react';
import './Button.css';

function Button(props) {
  if (props.onClick == null) {
    return (
      <div
        className="button text-center"
        style={{
          background: props.color,
          width: props.width,
          height: props.height,
        }}
      >
        <button
          type={props.type}
          style={{
            background: 'transparent',
            border: 0,
            width: 'auto',
            height: 'auto',
          }}
        >
          <a href={props.link}>{props.text}</a>
        </button>
      </div>
    );
  }
  if (props.onClick != null) {
    return (
      <div
        onClick={props.onClick}
        className="button text-center"
        style={{
          background: props.color,
          width: props.width,
          height: props.height,
        }}
      >
        <button
          type={props.type}
          style={{
            background: 'transparent',
            border: 0,
            width: 'auto',
            height: 'auto',
          }}
        >
          <a href={props.link}>{props.text}</a>
        </button>
      </div>
    );
  }
}

export default Button;
