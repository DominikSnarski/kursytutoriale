import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CourseService } from '../../api/Services/CourseService';
import AppRoutes from '../../routing/AppRoutes'

// eslint-disable-next-line
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Row,
  Col,
  Container
} from 'reactstrap';


const NewModule = (props) => {

  const history = useHistory();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);

    CourseService.addModule(
      props.courseId,
      formData.get('title'),
      formData.get('description'),
      formData.get('image'),
    ).then(() => {
      // props.setModuleId(response.data);
      history.push(`/courseview/${props.courseID}`)
      // props.show(true);
    });
  };

  return (
    <Container style={{ backgroundColor: '#7BC5DA' }}>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Row>
        </Row>
        <Row className="mt-2">
          <Col>
            1. What will be the title of the module?
            <FormGroup className="mt-2">
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="e.g. Breakfasts"
              />
              <FormFeedback valid>Sweet! that name is available</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center text-dark mt-2">
          <Col className="text-dark">
            2. What will you learn in this module?
            <FormGroup className="mt-2">
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                placeholder="e.g. In this module you will learn how..."
              />
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

        <Row className="mt-5">
          <Col>
            <Link to={AppRoutes.Home} className="font-weight-bold" ><Button>Back</Button></Link>
          </Col>
          <Col className="text-right">
            <Button color="secondary">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <br/>
    </Container>
  );
};

export default NewModule;
