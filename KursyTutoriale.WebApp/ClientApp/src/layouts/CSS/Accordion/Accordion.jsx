import React from "react";
import "./Accordion.css";

export const Accordion = props => {
  return (
    <div
      class="row pbars_accordions_container"
      style={{ background: props.color }}
    >
      <a href={props.link}>{props.text}</a>
    </div>
  );
};

export default Accordion;
