import React from 'react';
import './ErrorMessage.css';

export const ErrorMessage = ({ message, error, children }) => {
  return (
    <div>
      {children}
      {error && <p className="error_message">{message}</p>}
    </div>
  );
};

export default ErrorMessage;
