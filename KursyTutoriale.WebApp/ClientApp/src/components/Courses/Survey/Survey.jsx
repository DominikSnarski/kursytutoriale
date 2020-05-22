import React, { useState } from 'react';
import { Container, Input, Label } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Button from '../../../layouts/CSS/Button/Button';
import SurveyServce from '../../../api/Services/SurveyService';

function Survey(props) {
  const history = useHistory();
  
  const [question1Answer, setQuestion1Answer] = useState('');
  const [question2Answer, setQuestion2Answer] = useState('');
  const [question3Answer, setQuestion3Answer] = useState('');
  const [question4Answer, setQuestion4Answer] = useState('');
  const [question1Desc, setQuestion1Desc] = useState('');
  const [question3Desc, setQuestion3Desc] = useState('');
  const [question4Desc, setQuestion4Desc] = useState('');
  const [question5Desc, setQuestion5Desc] = useState('');

  const handleSubmit = () => {
    SurveyServce.updateSurvey(props.location.state.courseID, 'piwerko', [
      question1Answer,
      question1Desc,
      question2Answer,
      question3Answer,
      question3Desc,
      question4Answer,
      question4Desc,
      question5Desc,
    ]).then(()=>history.goBack());
  };

  return (
    <Container>
      <legend>How much did you like this course?</legend>
      <Label check>
        <Input
          type="radio"
          name="generalOpinion"
          onClick={() => setQuestion1Answer('It was awful')}
        />{' '}
        It was awful
      </Label>
      <br />
      <Label check>
        <Input
          type="radio"
          name="generalOpinion"
          onClick={() => setQuestion1Answer('There is much to improve')}
        />{' '}
        There is much to improve
      </Label>
      <br />
      <Label check>
        <Input
          type="radio"
          name="generalOpinion"
          onClick={() => setQuestion1Answer('It was OK')}
        />{' '}
        It was OK
      </Label>
      <br />
      <Label check>
        <Input
          type="radio"
          name="generalOpinion"
          onClick={() => setQuestion1Answer('I enjoyed it')}
        />{' '}
        I enjoyed it
      </Label>
      <br />
      <Label check>
        <Input
          type="radio"
          name="generalOpinion"
          onClick={() => setQuestion1Answer('It is perfect')}
        />{' '}
        It is perfect
      </Label>
      <br />
      Why?
      <br />
      <Input
        className="input_field"
        value={question1Desc}
        onChange={(e) => setQuestion1Desc(e.target.value)}
      />
      <br />
      <legend>Did you learn the skills you were expecting to?</legend>
      <Label check>
        <Input type="radio" name="learnedSkills" onClick={() => setQuestion2Answer('Yes')}/> Yes
      </Label>
      <br />
      <Label check>
        <Input type="radio" name="learnedSkills" onClick={() => setQuestion2Answer('No')}/> No
      </Label>
      <br />
      <br />
      <legend>Were the lessons clear and easy to understand?</legend>
      <Label check>
        <Input type="radio" name="understandableLessons" onClick={() => setQuestion3Answer('Yes')}/> Yes
      </Label>
      <br />
      <Label check>
        <Input type="radio" name="understandableLessons" onClick={() => setQuestion3Answer('No')}/> No
      </Label>
      <br />
      Why? Why not?
      <br />
      <Input
        className="input_field"
        value={question3Desc}
        onChange={(e) => setQuestion3Desc(e.target.value)}
      />
      <br />
      <legend>Would you recommend this course to someone?</legend>
      <Label check>
        <Input type="radio" name="understandableLessons" onClick={() => setQuestion4Answer('Yes')}/> Yes
      </Label>
      <br />
      <Label check>
        <Input type="radio" name="understandableLessons" onClick={() => setQuestion4Answer('No')}/> No
      </Label>
      <br />
      Why? Why not?
      <br />
      <Input
        className="input_field"
        value={question4Desc}
        onChange={(e) => setQuestion4Desc(e.target.value)}
      />
      <br />
      <legend>Do you have any suggestions to the author of this course?</legend>
      <Input
        className="input_field"
        value={question5Desc}
        onChange={(e) => setQuestion5Desc(e.target.value)}
      />
      <br />
      <br />
      <Button text="Back" />
      <Button text="Submit" onClick={() => handleSubmit()} />
    </Container>
  );
}

export default Survey;
