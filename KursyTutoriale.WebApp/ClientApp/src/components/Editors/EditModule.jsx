import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { ModuleService } from '../../api/Services/ModuleService';
import ErrorMessage from '../../layouts/CSS/ErrorMessage/ErrorMessage';

// eslint-disable-next-line
import { FormGroup, Row, Col, Container, Input } from 'reactstrap';

import Button from '../../layouts/CSS/Button/Button';

function NewModule(props) {
  const history = useHistory();

  const newModuleSchema = Yup.object().shape({
    title: Yup.string()
      .max(30, 'Title can contains max 30 characters')
      .required('Field required'),
    description: Yup.string().required('Field required'),
  });

  const handleSubmit = ({ title, description }) => {
    ModuleService.editModule(
      props.location.state.courseid,
      props.location.state.moduleid,
      title,
      description,
    ).then(() => {
      history.push(`/courseview/${props.location.state.courseid}`);
    });
  };

  return (
    <Container className="Container">
      <Row></Row>
      <Formik
        initialValues={{
          title: props.location.state.title,
          description: props.location.state.description,
        }}
        validationSchema={newModuleSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, handleChange, values }) => (
          <Form>
            <Row className="mt-2">
              <Col>
                1. What will be the title of the module?
                <FormGroup className="mt-2">
                  <ErrorMessage message={errors.title} error={!!errors.title}>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="e.g. Breakfasts"
                      className="input_field"
                      value={values.title}
                      onChange={handleChange}
                    />
                  </ErrorMessage>
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-center text-dark mt-2">
              <Col className="text-dark">
                2. What will you learn in this module?
                <FormGroup className="mt-2">
                  <ErrorMessage
                    message={errors.description}
                    error={!!errors.description}
                  >
                    <Input
                      type="textarea"
                      name="description"
                      id="exampleText"
                      placeholder="e.g. In this module you will learn how..."
                      className="input_field"
                      value={values.description}
                      onChange={handleChange}
                    />
                  </ErrorMessage>
                </FormGroup>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col>
                <Button
                  text="Back"
                  onClick={() => {
                    history.push(
                      `/courseview/${props.location.state.courseid}`,
                    );
                  }}
                ></Button>
              </Col>
              <Col className="text-right">
                <Button text="Submit"></Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      <br />
    </Container>
  );
}

export default NewModule;
