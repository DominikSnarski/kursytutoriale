import React, { useState } from 'react';
import { Container, Collapse, } from 'reactstrap';

function CompleteSurvey(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <tbody>
      <tr onClick={() => toggle()} style={{ cursor: 'pointer' }}>
        <td>{props.num}</td>
        <td>{props.survey.date}</td>
        <td>Survey</td>
      </tr>
      <Collapse isOpen={isOpen}>
        <Container>
        <legend>How much did you like this course?</legend>
      {props.survey.rating}
      <br />
      <b>Why?</b>
      <br />
      {props.survey.ratingDesc}
      <br />
      <br />

      <legend>Did you learn the skills you were expecting to?</legend>
      {props.survey.learnedSkills}
      <br />
      <br />

      <legend>Were the lessons clear and easy to understand?</legend>
      {props.survey.lessons}
      <br />
      <b>Why? Why not?</b>
      <br />
      {props.survey.lessonsDesc}
      <br />
      <br />
      
      <legend>Would you recommend this course to someone?</legend>
      {props.survey.recommendation}
      <br />
      <b>Why? Why not?</b>
      <br />
      {props.survey.recommendationDesc}
      <br />
      <br />

      <legend>Do you have any suggestions to the author of this course?</legend>
      {props.survey.suggestions}
      <br />

      <br />
        </Container>
      </Collapse>
    </tbody>
  );
}
export default CompleteSurvey;
