import React, { useState, useEffect } from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { Form, FormGroup, Input, Row, Col, Container, Spinner } from 'reactstrap';
import AppRoutes from '../../routing/AppRoutes';
import { CourseService } from '../../api/Services/CourseService';

import Button from '../../layouts/CSS/Button/Button';

function SummaryOfPayment(props) {
  const history = useHistory();
  const { courseId } = useParams();

  const [course, setCourse] = useState(props.course);
  const [courseLoaded, setCourseLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newDiscount, setNewDiscount] = useState('');
  const [newPrice, setNewPrice] = useState('');


  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      CourseService.getCourse(courseId).then((response) => {
        setCourse(response.data);
        setCourseLoaded(true);
      });
    }
  });

  const handleButtonAddDiscountClick = () => {
      setNewPrice(CourseService.getPriceWithDiscount(course.id, newDiscount)
      .then(() => history.push('/'))
      .then(() => history.push(`/courseview/${course.id}`)));
  }

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
    // if (newPrice !== '') {

    // }

    event.preventDefault();
    history.push(generatePath(AppRoutes.Payment, { courseId: course.id }));
  };

  return (
    <Container className="Container">
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
                  <Input onChange={e => setNewDiscount(e.target.value)} name="newDisc"/>
                </Col>

                <Col>
                <br/>
                <Button
                height='40px'
                onClick={() => handleButtonAddDiscountClick()}
                text="Add discount"
              />
                </Col>

                <Form onSubmit={(e) => handleSubmit(e)}>

                <Col>
                  Price with a discount:
                  <br/>
                  <h3 name="priceWithDisc">
                    {newPrice}
                  </h3>
                </Col>

                </Form>

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
            <Button text="Submit"></Button>
          </Col>
        </Row>
      <br />
    </Container>
  );
}

export default SummaryOfPayment;