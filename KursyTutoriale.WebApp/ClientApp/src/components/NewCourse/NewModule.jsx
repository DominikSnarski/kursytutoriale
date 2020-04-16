import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ModuleService } from '../../api/Services/ModuleService';

// eslint-disable-next-line
import {
  Form,
  FormGroup,
  FormFeedback,
  Row,
  Col,
  Container,
  Input,
} from 'reactstrap';

import Button from '../../layouts/CSS/Button/Button';

function NewModule(props) {
  const history = useHistory();
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');

  const handleTextChange = () => {
    setTitleErrorMessage('');
    setDescriptionErrorMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    if (formData.get('title') === '') {
      setTitleErrorMessage("Title can't be empty");
    }

    if (formData.get('description') === '') {
      setDescriptionErrorMessage("Description can't be empty");
    }

    if (formData.get('description') === '' || formData.get('title') === '') {
      return;
    }

    ModuleService.addModule(
      props.location.state.courseid,
      formData.get('title'),
      formData.get('description'),
      'there will be no image here. Please delete me!',
    ).then(() => {
      history.push(`/courseview/${props.location.state.courseid}`);
    });
  };

  return (
    <Container className="Container">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Row></Row>
        <Row className="mt-2">
          <Col>
            1. What will be the title of the module?
            <FormGroup className="mt-2">
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="e.g. Breakfasts"
                className="input_field"
                onChange={handleTextChange}
              />
              <FormFeedback valid>Sweet! that name is available</FormFeedback>
            </FormGroup>
            <span className="errorMessage">{titleErrorMessage}</span>
          </Col>
        </Row>
        <Row className="justify-content-center text-dark mt-2">
          <Col className="text-dark">
            2. What will you learn in this module?
            <FormGroup className="mt-2">
              <Input
                type="textarea"
                name="description"
                id="exampleText"
                placeholder="e.g. In this module you will learn how..."
                className="input_field"
                onChange={handleTextChange}
              />
            </FormGroup>
            <span className="errorMessage">{descriptionErrorMessage}</span>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Button
              text="Back"
              onClick={() => {
                history.push(`/courseview/${props.location.state.courseid}`);
              }}
            ></Button>
          </Col>
          <Col className="text-right">
            <Button text="Submit"></Button>
          </Col>
        </Row>
      </Form>
      <br />
    </Container>
  );
}

export default NewModule;
