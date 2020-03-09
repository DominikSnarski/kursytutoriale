import React from "react";
import "./Alert.css";

export const Alert = props => {
  return (
    <div class="alert text-center">
      <a>{props.text}</a>
    </div>
  );
};

export default Alert;
