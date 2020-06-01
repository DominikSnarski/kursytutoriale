import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
// eslint-disable-next-line
import {
  Alert,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import AuthService from '../../api/Services/AuthService';
import Button from '../../layouts/CSS/Button/Button';

const ForgotPassword = () => {
  const history = useHistory();
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/g;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

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

    AuthService.forgotPassword(
      formData.get('email'),
    ).then(() => history.push('/ChangePassword'));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Alert color="primary" className="text-center">
            Enter your email. We will send you code you can use to change your password.
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={(e) => handleSubmit(e)}>

            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="text"
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
            <Button color="primary" text="Confirm"></Button>{' '}
          </Form>
        </Col>
      </Row>

    </Container>
  );
};

export default ForgotPassword;
