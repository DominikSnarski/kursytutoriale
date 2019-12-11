import React from 'react';

// eslint-disable-next-line
import { Button, Form, FormGroup, FormFeedback, Input, Row, Col, Container, Alert } from 'reactstrap';
const AddModuleView = () => {
    return (
        <Container>
            <Form>
                <Row>
                    <Col>
                        <Alert color="primary" className="text-center">
                            Module creator <br></br>
                            <hr />
                            The module brings together lessons of the same category.<br></br>
                            Remember to give it a proper name and description <br></br>
                            to make learning easier for users.
                        </Alert>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        1. What will be the title of the module?
                        <FormGroup className="mt-2">                          
                            <Input type="text" name="title" id="title" placeholder="e.g. Breakfasts" />
                            <FormFeedback valid>Sweet! that name is available</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="justify-content-center text-dark mt-2">
                    <Col className="text-dark">
                        2. What will you learn in this module?
                        <FormGroup className="mt-2">
                            <Input type="textarea" name="text" id="exampleText" placeholder="e.g. In this module you will learn how..." />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-2">
                        3. Select a module profile photo
                        <FormGroup className="mt-2">                     
                            <Input type="file" getRef="attachments" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Button color="primary">Create module</Button>
                </Row>
            </Form>
        </Container>
        );


    
}

export default AddModuleView;