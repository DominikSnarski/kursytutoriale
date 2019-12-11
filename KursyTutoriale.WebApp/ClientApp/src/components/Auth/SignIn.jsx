import React from 'react';
// eslint-disable-next-line
import { Button, Form, FormGroup, Label, Input, Row, Col, Container, Alert } from 'reactstrap';
import apiClient from '../../Api/ApiClient';
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const SignIn = (props) => {

    let history=useHistory();

    const handleSubmit=(event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);

        apiClient.login(formData.get('name'),formData.get('password'))
        .then(()=>history.push("/"));
    }

    return (
        <Container>
            <Row>
                <Col>
                <Alert color="primary" className="text-center">
                    SIGN IN FORM
                </Alert>
                </Col>              
            </Row>
            <Form onSubmit={e=>handleSubmit(e)}>
                <FormGroup>
                    <Label for="exampleEmail">Username</Label>
                    <Input type="text" name="name" id="exampleName" placeholder="Enter your username" />
                </FormGroup>

                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Enter your password" />
                </FormGroup>

                <Row>
                    <Col xs="auto">
                        <Button color="primary">Sign in</Button>{' '}
                        <Link to="/register"><Button outline color="primary">I don't have an account</Button></Link>{' '}
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default SignIn;