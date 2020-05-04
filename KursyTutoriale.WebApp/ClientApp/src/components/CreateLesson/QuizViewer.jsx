/* eslint-disable */
import React, { useState } from 'react';
import {
  Alert,
  Container,
  FormGroup,
  Form,
  FormFeedback,
  Input,
  Row,
  Label,
  Button,
} from 'reactstrap';
import { Fade } from 'react-reveal';
import { useHistory, Link } from 'react-router-dom';
import AppRoutes from '../../routing/AppRoutes';
//import Button from '../../layouts/CSS/Button/Button';

const QuizViewer = (props) => {
  const [quiz, setQuiz] = useState(props.content);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(
    [...Array(props.content.questions.length)].map((x) => -1),
  );
  const [score, setScore] = useState(-1);

  const checkAnswers = () => {
    let nscore = 0;
    answers.map((answer, k) => {
      if (answer == quiz.questions[k].correct) nscore++;
    });
    setScore(nscore);
  };

  const answerChanged = (e) => {
    resetScore();
    let ans = answers;
    ans[currentQuestionIndex] = e.target.value;
    setAnswers([...ans]);
  };

  const resetScore = () => {
    setScore(-1);
  };

  return (
    <Container>
      <Label>{quiz.questions[currentQuestionIndex].question}</Label>
      <FormGroup>
        {quiz.questions[currentQuestionIndex].answers.map((answer, k) => {
          return (
            <FormGroup check key={k}>
              <Label>
                <Input
                  checked={parseInt(answers[currentQuestionIndex]) == k}
                  onChange={answerChanged}
                  type="radio"
                  name={`ansK${k}Q${props.index}`}
                  value={k}
                />{' '}
                {answer}
              </Label>
            </FormGroup>
          );
        })}
      </FormGroup>
      {quiz.questions.length > 1 && (
        <Label>
          <Button
            text="Prev"
            onClick={() => {
              if (!currentQuestionIndex - 1 < 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
                resetScore();
              }
            }}
          >
            Prev
          </Button>
          <Button
            style={{ marginRight: '3px' }}
            text="Next"
            onClick={() => {
              if (!currentQuestionIndex + 1 > quiz.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                resetScore();
              }
            }}
          >
            Next
          </Button>
          {currentQuestionIndex + 1} out of {quiz.questions.length}
        </Label>
      )}
      {quiz.questions.length - 1 === currentQuestionIndex && (
        <Label>
          <Button
            style={{ marginLeft: '3px' }}
            text="Check Your Answers"
            onClick={() => {
              checkAnswers();
            }}
          >
            Check Your Answers
          </Button>
        </Label>
      )}
      {score >= 0 && (
        <p style={{ color: 'green', fontSize: 20 }}>
          Your Score Was {score} / {quiz.questions.length}
        </p>
      )}
    </Container>
  );
};

export default QuizViewer;
