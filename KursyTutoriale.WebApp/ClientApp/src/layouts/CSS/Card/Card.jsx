import React from "react";
import "./Card.css";

export const Card = props => {
  return (
    <div className="card">
      <img src={props.image}></img>
      <div className="text-center">
        <div className="card-title">
          <a href={props.link}>{props.title}</a>
        </div>
        <div className="card-text">{props.cardtext}</div>
      </div>
      <div className="box_low d-flex flex-row align-items-center">
        <div className="author_image">
          <img src={props.author_image}></img>
        </div>
        <div className="author_name">
          {props.name}, <span>Creator</span>
        </div>
        <div className="price d-flex flex-column align-items-center justify-content-center">
          <span>${props.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
