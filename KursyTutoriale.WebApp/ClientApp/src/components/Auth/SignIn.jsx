import React from 'react';
// eslint-disable-next-line
import {
  Button,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Container,
  Alert,
} from 'reactstrap';
import { Formik, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import apiClient from '../../api/ApiClient';
import AppRoutes from '../../routing/AppRoutes';
import ErrorMessage from '../../layouts/CSS/ErrorMessage/ErrorMessage';

const SignIn = () => {
  const history = useHistory();

  const handleSubmit = ({ login, password }) => {
    apiClient.login(login, password).then(() => {
      history.push('/');
    });
  };

  const signInShema = Yup.object().shape({
    login: Yup.string()
      .required('Field required')
      .min(5),
    password: Yup.string()
      .required('Field required')
      .min(5),
  });

  return (
    <Container>
      <Row>
        <Col>
          <Alert color="primary" className="text-center">
            SIGN IN FORM
          </Alert>
        </Col>
      </Row>
      <Formik
        initialValues={{ login: '', password: '' }}
        validationSchema={signInShema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, handleChange, errors }) => (
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Username</Label>
              <ErrorMessage error={!!errors.login} message={errors.login}>
                <Input
                  type="text"
                  name="login"
                  placeholder="Enter your username"
                  value={values.login}
                  onChange={handleChange}
                />
              </ErrorMessage>
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <ErrorMessage error={!!errors.password} message={errors.password}>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                />
              </ErrorMessage>
            </FormGroup>
            <Row>
              <Col xs="auto">
                <Button color="primary">Sign in</Button>{' '}
                <Link to={AppRoutes.Register}>
                  <Button outline color="primary">
                    I don&apos;t have an account
                  </Button>
                </Link>{' '}
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignIn;
