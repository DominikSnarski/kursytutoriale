import React from 'react';
import './InputField.css';

export const InputField = (props) => {
  return (
    <input
      className="input_field"
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      id={props.id}
    ></input>
  );
};

export default InputField;
