import React, {useState} from 'react';
// eslint-disable-next-line
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Container,
  Alert,
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';

import apiClient from '../../api/ApiClient';
import AppRoutes from '../../routing/AppRoutes';

const SignIn = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  const something=()=>{
    setErrorMessage("We couldn't find given user in our database.");
  }

  const handleSubmit = (event) => {
    setErrorMessage('');
    event.preventDefault();
    const formData = new FormData(event.target);

    apiClient
      .login(formData.get('name'), formData.get('password'), something)
      .then(() => { if(errorMessage !== '') history.push('/');});
  };

  return (
    <Container>
      <Row>
        <Col>
          <Alert color="primary" className="text-center">
            SIGN IN FORM
          </Alert>
        </Col>
      </Row>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Label for="exampleEmail">Username</Label>
          <Input
            type="text"
            name="name"
            id="exampleName"
            placeholder="Enter your username"
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
        <Row>
          <p style={{ color: 'red', marginTop: '-2%' }}>{errorMessage}</p>
        </Row>

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
    </Container>
  );
};

export default SignIn;
