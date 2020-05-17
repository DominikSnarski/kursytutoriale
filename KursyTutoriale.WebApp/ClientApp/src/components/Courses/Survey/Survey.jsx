import React from 'react';
import { Container, Input, Label } from 'reactstrap';
import InputField from '../../../layouts/CSS/InputField/InputField';
import Button from '../../../layouts/CSS/Button/Button';

function Survey() {
  return (
    <Container>
      <legend>How much did you like this course?</legend>
      <Label check>
        <Input type="radio" name="generalOpinion" /> 1 - It was awful
      </Label>
      <br />
      <Label check>
        <Input type="radio" name="generalOpinion" /> 2 - There is much to
        improve
      </Label>
      <br />
      <Label check>
        <Input type="radio" name="generalOpinion" /> 3 - It was OK
      </Label>
      <br />
      <Label check>
        <Input type="radio" name="generalOpinion" /> 4 - I enjoyed it
      </Label>
      <br />
      <Label check>
        <Input type="radio" name="generalOpinion" /> 5 - It is perfect
      </Label>
      <br />
      Why?
      <br />
      <InputField />
      <br />

      <legend>Did you learn the skills you were expecting to?</legend>
      <Label check>
        <Input type="radio" name="learnedSkills" /> Yes
      </Label>
      <br />
      <Label check>
        <Input type="radio" name="learnedSkills" /> No
      </Label>
      <br />
      <br />

      <legend>Were the lessons clear and easy to understand?</legend>
      <Label check>
        <Input type="radio" name="understandableLessons" /> Yes
      </Label>
      <br />
      <Label check>
        <Input type="radio" name="understandableLessons" /> No
      </Label>
      <br />
      Why? Why not?
      <br />
      <InputField />
      <br />
      
      <legend>Would you recommend this course to someone?</legend>
      <Label check>
        <Input type="radio" name="understandableLessons" /> Yes
      </Label>
      <br />
      <Label check>
        <Input type="radio" name="understandableLessons" /> No
      </Label>
      <br />
      Why? Why not?
      <br />
      <InputField />
      <br />

      <legend>Do you have any suggestions to the author of this course?</legend>
      <InputField />
      <br />

      <br />
      <Button text='Back'/>
      <Button text='Submit'/>
    </Container>
  );
}

export default Survey;
