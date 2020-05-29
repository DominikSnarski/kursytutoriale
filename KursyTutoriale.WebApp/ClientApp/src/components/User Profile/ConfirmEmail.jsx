import React from 'react';
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

const ConfirmEmail = () => {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);


    AuthService.confirmEmail(
      formData.get('code'),
    ).then(() => history.push('/'));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Alert color="primary" className="text-center">
            Email Confirmation
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={(e) => handleSubmit(e)}>

            <FormGroup>
              <Label for="exampleEmail">Code</Label>
              <Input
                type="text"
                name="code"
                id="exampleCode"
                placeholder="Enter activation code"
              />
            </FormGroup>
            <Button color="primary" text="Confirm"></Button>{' '}
          </Form>
        </Col>
      </Row>

    </Container>
  );
};

export default ConfirmEmail;
