import React from 'react';
// eslint-disable-next-line
import { Button, Form, FormGroup, Label, Input, FormText, Nav, NavItem, NavLink, Row, Col, Container, Alert } from 'reactstrap';
import AuthService from '../ApiServices/AuthService';

const SignUpForm = (props) => {
    const handleSubmit=(event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);

        AuthService.createAccount(formData.get('name'),formData.get('password'),formData.get('email'));
    }

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
                    <Form onSubmit={(e)=>handleSubmit(e)}>
                        <FormGroup>
                            <Label for="exampleEmail">Name</Label>
                            <Input type="text" name="name" id="exampleEmail" placeholder="Enter your full name" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleEmail">E-mail adress</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Enter your email" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="Enter your password" />
                        </FormGroup>
                    

                        <Row style={{ marginTop: 20 }}>
                            <Col xs="auto">
                                <Button color="primary">Sign up</Button>{' '}
                                <Button href="#" outline color="primary">I already have an account</Button>{' '}
                            </Col>
                        </Row>
                    </Form>
                </Col>

            </Row>
        </Container>
    );
}

export default SignUpForm;