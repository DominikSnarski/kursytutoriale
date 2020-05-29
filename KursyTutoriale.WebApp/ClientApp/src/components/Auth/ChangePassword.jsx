import React, { useState } from 'react';
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

const ChangePassword = () => {
    const history = useHistory();
    const [errorMessagePass, setErrorMessagePass] = useState('');
    const [isWrong, setIsWrong] = useState(false);
    const passwordRegex = /(.{3,})/g;

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        if (passwordRegex.exec(formData.get('password')) === null) {
            setIsWrong(true);
            setErrorMessagePass('Password must have at least 3 characters.');
            return;
        }

        if (isWrong) {
            setIsWrong(false);
            return;
        }

        AuthService.changePassword(
            formData.get('code'),
            formData.get('password'),
        ).then(() => history.push('/signin'));
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Alert color="primary" className="text-center">
                        Change Password
          </Alert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={(e) => handleSubmit(e)}>

                        <FormGroup>
                            <Label for="exampleCode">Code</Label>
                            <Input
                                type="text"
                                name="code"
                                id="exampleCode"
                                placeholder="Enter code"
                            />
                        </FormGroup>


                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="Enter your new password"
                            />
                        </FormGroup>
                        <Row>
                            <p style={{ color: 'red', marginTop: '-2%' }}>
                                {errorMessagePass}
                            </p>
                        </Row>

                        <Button color="primary" text="Confirm"></Button>{' '}
                    </Form>
                </Col>
            </Row>

        </Container>
    );
};

export default ChangePassword;
