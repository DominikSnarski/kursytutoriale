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

const QuizEditor = (props) => {
  const [quiz, setQuiz] = useState(props.quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const blankQuestion = {
    question: '',
    answers: ['', ''],
    correct: 0,
  };

  const answerChanged = (e) => {
    let q = quiz;
    q.questions[currentQuestionIndex].correct = e.target.value;
    setQuiz({ ...q });
    props.updateQuiz(quiz, props.itemIndex);
  };

  const questionAnswerChanged = (e) => {
    let q = quiz;
    q.questions[currentQuestionIndex].answers[parseInt(e.target.id)] =
      e.target.value;
    setQuiz({ ...q });
    props.updateQuiz(quiz, props.itemIndex);
  };

  const addQuestion = () => {
    let q = quiz;
    q.questions = [...q.questions, blankQuestion];
    setQuiz({ ...q });
    props.updateQuiz(quiz, props.itemIndex);
  };

  const addAnswer = () => {
    let q = quiz;
    q.questions[currentQuestionIndex].answers = [
      ...q.questions[currentQuestionIndex].answers,
      '',
    ];
    setQuiz({ ...q });
    props.updateQuiz(quiz, props.itemIndex);
  };

  const questionChanged = (e) => {
    let q = quiz;
    q.questions[currentQuestionIndex].question = e.target.value;
    setQuiz({ ...q });
    props.updateQuiz(quiz, props.itemIndex);
  };

  return (
    <Container>
      <Label>Quiz Editor</Label>
      <Input
        value={quiz.questions[currentQuestionIndex].question}
        placeholder="Question"
        className="input_field mb-3"
        type="text"
        onChange={questionChanged}
      />
      <FormGroup>
        {quiz.questions[currentQuestionIndex].answers.map((answer, k) => {
          return (
            <FormGroup check key={k}>
              <Label>
                <Input
                  checked={
                    parseInt(quiz.questions[currentQuestionIndex].correct) == k
                  }
                  onChange={answerChanged}
                  type="radio"
                  name="answer"
                  value={k}
                />{' '}
                <Input
                  id={k}
                  value={answer}
                  placeholder={'Answer ' + (k + 1)}
                  className="input_field mb-3"
                  type="text"
                  onChange={questionAnswerChanged}
                />
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
              if (!(currentQuestionIndex - 1 < 0)) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
              }
            }}
          >
            Prev
          </Button>
          <Button
            text="Next"
            onClick={() => {
              if (!(currentQuestionIndex + 1 > quiz.questions.length - 1)) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }
            }}
          >
            Next
          </Button>
          {currentQuestionIndex + 1} out of {quiz.questions.length}
        </Label>
      )}
      <p></p>
      <FormGroup style={{ marginBottom: '10px' }}>
        <Button
          text="Add Answer"
          onClick={() => {
            addAnswer();
          }}
        >
          Add Answer
        </Button>
        <Button
          text="Add Question"
          onClick={() => {
            addQuestion();
          }}
        >
          Add Question
        </Button>
      </FormGroup>
    </Container>
  );
};

export default QuizEditor;
