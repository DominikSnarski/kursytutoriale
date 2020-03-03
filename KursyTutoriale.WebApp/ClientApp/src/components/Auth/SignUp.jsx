import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// eslint-disable-next-line
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import AuthService from '../../api/Services/AuthService';
import AppRoutes from '../../routing/AppRoutes';

const SignUp = () => {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    AuthService.createAccount(
      formData.get('name'),
      formData.get('password'),
      formData.get('email'),
    ).then(() => history.push('/editprofile'));
  };

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
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input
                type="text"
                name="name"
                id="exampleEmail"
                placeholder="Enter your full name"
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleEmail">E-mail adress</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Enter your email"
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Enter your password"
              />
            </FormGroup>

            <Row style={{ marginTop: 20 }}>
              <Col xs="auto">
                <Button color="primary">Sign up</Button>{' '}
                <Link to={AppRoutes.Signin}>
                  <Button outline color="primary">
                    I already have an account
                  </Button>
                </Link>{' '}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
