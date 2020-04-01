import React from 'react';
import { useHistory } from 'react-router-dom';
import { ModuleService } from '../../api/Services/ModuleService';

// eslint-disable-next-line
import {
  Form,
  FormGroup,
  FormFeedback,
  Row,
  Col,
  Container
} from 'reactstrap';

import Button from '../../layouts/CSS/Button/Button';
import Input from '../../layouts/CSS/InputField/InputField';

function NewModule (props) {

  const history = useHistory();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);

    ModuleService.addModule(
      props.location.state.courseid,
      formData.get('title'),
      formData.get('description'),
      "there will be no image here. Please delete me!"
    ).then(() => {
      history.push(`/courseview/${props.location.state.courseid}`)
    });
  };

  return (
    <Container className="Container">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Row>
        </Row>
        <Row className="mt-2">
          <Col>
            1. What will be the title of the module?
            <FormGroup className="mt-2">
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="e.g. Breakfasts"
              />
              <FormFeedback valid>Sweet! that name is available</FormFeedback>
            </FormGroup>
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
              />
            </FormGroup>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Button text="Back" onClick={() => {history.goBack()}}></Button>
          </Col>
          <Col className="text-right">
            <Button text="Submit">
            </Button>
          </Col>
        </Row>
      </Form>
      <br/>
    </Container>
  );
};

export default NewModule;
