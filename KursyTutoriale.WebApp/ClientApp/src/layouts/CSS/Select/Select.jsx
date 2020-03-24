import React from "react";
import "./Select.css";

export const Select = props => {
  return (
    <select
      className="select"
      type={props.type}
      value={props.value}
      onChange={props.onChange}
    >
    </select>
  );
};

export default Select;
