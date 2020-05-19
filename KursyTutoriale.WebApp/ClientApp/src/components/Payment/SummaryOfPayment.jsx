import React, { useState, useEffect } from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { Form, FormGroup, Row, Col, Container, Spinner } from 'reactstrap';
import AppRoutes from '../../routing/AppRoutes';
import { CourseService } from '../../api/Services/CourseService';

import Button from '../../layouts/CSS/Button/Button';

function SummaryOfPayment(props) {
  const history = useHistory();
  const { courseId } = useParams();

  const [course, setCourse] = useState(props.course);
  const [courseLoaded, setCourseLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      CourseService.getCourse(courseId).then((response) => {
        setCourse(response.data);
        setCourseLoaded(true);
      });
    }
  });

  if (!courseLoaded) {
    return (
      <Row>
        <Col xs="6" sm="4"></Col>
        <Col xs="6" sm="4">
          <Spinner
            className="d-lg-flex d-block h2"
            style={{ width: '3rem', height: '3rem' }}
            color="primary"
          />
        </Col>
        <Col sm="4"></Col>
      </Row>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(generatePath(AppRoutes.Payment, { courseId: course.id }));
  };

  return (
    <Container className="Container">
      <Form>
        <Row></Row>
        <Row className="mt-2">
          <Col>
            <h1>Summary of payment</h1>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <FormGroup className="mt-2">
              <Row className="mt-2">
                <Col>
                  Price:
                  <br/>
                  <h3>
                    {course.price} $
                  </h3>
                </Col>

                <Col>
                  Discount:
                  <br/>
                  <h3>

                  </h3>
                </Col>

                <Col>
                  Price with a discount:
                  <br/>
                  <h3>

                  </h3>
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
          <Button
              text="Back"
              onClick={() => {
                history.push(`/courseview/${courseId}`);
              }}
            ></Button>
          </Col>
          <Col className="text-right">
            <Button text="Submit" onClick={(e) => handleSubmit(e)}></Button>
          </Col>
        </Row>
      </Form>
      <br />
    </Container>
  );
}

export default SummaryOfPayment;
