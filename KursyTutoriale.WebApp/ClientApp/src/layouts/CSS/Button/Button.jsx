import React from 'react';
import './Button.css';

function Button(props) {
  if (props.onClick == null) {
    return (
      <div
        id={props.id}
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
            width: '100%',
            height: '100%',
          }}
        >
          <a href={props.link} style={{ fontSize: props.fontSize }}>
            {props.text}
          </a>
        </button>
      </div>
    );
  }
  if (props.onClick != null) {
    return (
      <div
        id={props.id}
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
            width: '100%',
            height: '100%',
          }}
        >
          <a href={props.link} style={{ fontSize: props.fontSize }}>
            {props.text}
          </a>
        </button>
      </div>
    );
  }
}

export default Button;
