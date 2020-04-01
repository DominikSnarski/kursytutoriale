import React from 'react';
import './Alert.css';

export const Alert = (props) => {
  return (
    <div className="alert text-center">
      <a>{props.text}</a>
    </div>
  );
};

export default Alert;
