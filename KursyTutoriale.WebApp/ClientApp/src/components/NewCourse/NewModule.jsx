import React from 'react';
import { CourseService } from '../../Api/Services/CourseService';
import { Button, Form, FormGroup, FormFeedback, Input, Row, Col, Container, Alert } from 'reactstrap';
const AddModuleView = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
  
        CourseService.addModule(
          props.courseId,
          nrOfModules,
          formData.get('title'),
          formData.get('description')
        ).then(()=>{
            props.setModuleId()
            props.show(true);
        });
  
        
      }

    return (
        <Container style={{backgroundColor: "#7BC5DA"}}>
            <Form onSubmit={(e)=>handleSubmit(e)}>
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
                            <Input type="textarea" name="description" id="description" placeholder="e.g. In this module you will learn how..." />
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
                <Row className="justify-content-center text-dark">
                    Learn more about our policies <a href="#" className="alert-link">{' '}here</a>.
                </Row>
                <Row className="justify-content-center mt-2">
                    <Button color="primary">Create module</Button>
                </Row>
            </Form>
        </Container>

        
    );


    
}

export default AddModuleView;