import React from 'react';
// eslint-disable-next-line
import { Button, Form, FormGroup, Label, Input, FormText, Nav, NavItem, NavLink, Row, Col, Container, Alert } from 'reactstrap';

const SignInForm = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                <Alert color="primary" className="text-center">
                    SIGN IN FORM
                </Alert>
                </Col>              
            </Row>
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">E-mail adress</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Enter your email" />
                </FormGroup>

                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Enter your password" />
                </FormGroup>

                <Row>
                    <Col xs="auto">
                        <Button color="primary">Sign in</Button>{' '}
                        <Button href="#" outline color="primary">I don't have an account</Button>{' '}
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default SignInForm;