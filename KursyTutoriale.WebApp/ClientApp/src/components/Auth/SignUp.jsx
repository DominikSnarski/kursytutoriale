import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// eslint-disable-next-line
import {
  Alert,
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../api/Services/AuthService';
import AppRoutes from '../../routing/AppRoutes';
import ErrorMessage from '../../layouts/CSS/ErrorMessage/ErrorMessage';

const SignUp = () => {
  const history = useHistory();

  const passwordRegex = /(.{3,})/g;
  const usernameRegex = /(\w{3,})/g;

  const handleSubmit = ({ login, password, email }) => {
    AuthService.createAccount(login, password, email).then(() =>
      history.push('/editprofile'),
    );
  };

  const signUpSchema = Yup.object().shape({
    login: Yup.string()
      .min(5)
      .matches(usernameRegex)
      .required('Field required'),
    password: Yup.string()
      .min(5)
      .matches(passwordRegex)
      .required('Field required'),
    email: Yup.string()
      .email('Valid email address required')
      .required('Field required'),
  });

  return (
    <Container>
      <Row>
        <Col>
          <Alert color="primary" className="text-center">
            SIGN UP FORM
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Formik
            initialValues={{ login: '', password: '', email: '' }}
            validationSchema={signUpSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, handleChange, errors }) => (
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Name</Label>
                  <ErrorMessage error={!!errors.login} message={errors.login}>
                    <Input
                      type="text"
                      name="login"
                      placeholder="Enter your full name"
                      value={values.login}
                      onChange={handleChange}
                    />
                  </ErrorMessage>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleEmail">E-mail adress</Label>
                  <ErrorMessage error={!!errors.email} message={errors.email}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </ErrorMessage>
                </FormGroup>

                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <ErrorMessage
                    error={!!errors.password}
                    message={errors.password}
                  >
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </ErrorMessage>
                </FormGroup>

                <Row style={{ marginTop: 20 }}>
                  <Col xs="auto">
                    <Button type="submit" color="primary">
                      Sign up
                    </Button>{' '}
                    <Link to={AppRoutes.Signin}>
                      <Button outline color="primary">
                        I already have an account
                      </Button>
                    </Link>{' '}
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
