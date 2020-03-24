import React from "react";
import "./Label.css";

export const Label = props => {
  return (
    <text
      className="label"
    >
    {props.text}
    </text>
  );
};

export default Label;
