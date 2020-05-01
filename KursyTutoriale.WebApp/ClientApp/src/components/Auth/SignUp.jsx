import React, {useState} from 'react';
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
  const [errorMessageUser, setErrorMessageUser] = useState('');
  const [errorMessagePass, setErrorMessagePass] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const passwordRegex = /(.{3,})/g;
  const usernameRegex = /(\w{3,})/g;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/g;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (passwordRegex.exec(formData.get('password')) === null) {
      setIsWrong(true);
      setErrorMessagePass('Password must have at least 3 characters.');
      return;
    }

    if (usernameRegex.exec(formData.get('name')) === null) {
      setIsWrong(true);
      setErrorMessageUser('Username must have at least 3 characters. Special characters are not allowed.');
      return;
    }

    if (emailRegex.exec(formData.get('email')) === null) {
      setIsWrong(true);
      setErrorMessageEmail('Please enter correct email address.');
      return;
    }

    if (isWrong) 
    {
      setIsWrong(false);
      return;
    }

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
            <Row>
              <p style={{ color: 'red', marginTop: '-2%' }}>
                {errorMessageUser}
              </p>
            </Row>

            <FormGroup>
              <Label for="exampleEmail">E-mail adress</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Enter your email"
              />
            </FormGroup>
            <Row>
              <p style={{ color: 'red', marginTop: '-2%' }}>
                {errorMessageEmail}
              </p>
            </Row>

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
              <p style={{ color: 'red', marginTop: '-2%' }}>
                {errorMessagePass}
              </p>
            </Row>

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
