import React from "react";
import "./Button.css";

export const Button = props => {
  return (
    <div className="button text-center" style={{ background: props.color }}>
      <a href={props.link}>{props.text}</a>
    </div>
  );
};

export default Button;
