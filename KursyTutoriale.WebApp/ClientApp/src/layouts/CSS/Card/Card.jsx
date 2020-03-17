import React from "react";
import "./Card.css";

export const Card = props => {
  return (
    <div class="card">
      <img src={props.image}></img>
      <div class="text-center">
        <div class="card-title">
          <a href={props.link}>{props.title}</a>
        </div>
        <div class="card-text">{props.cardtext}</div>
      </div>
      <div class="box_low d-flex flex-row align-items-center">
        <div class="author_image">
          <img src={props.author_image}></img>
        </div>
        <div class="author_name">
          {props.name}, <span>Creator</span>
        </div>
        <div class="price d-flex flex-column align-items-center justify-content-center">
          <span>${props.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
