import React from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { Form, FormGroup, Row, Col, Container } from 'reactstrap';
import AppRoutes from '../../routing/AppRoutes';

import Button from '../../layouts/CSS/Button/Button';

function SummaryOfPayment(props) {
  const history = useHistory();
  const { courseID } = useParams();
  const { price } = useParams();
  const { discount } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();

    history.push(generatePath(AppRoutes.Payment, { courseId: courseID }));
  };

  return (
    <Container className="Container">
      <Form onSubmit={(e) => handleSubmit(e)}>
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
                  <h2>
                    {price}
                  </h2>
                </Col>

                <Col>
                  Discount:
                  <h2>
                    {discount}
                  </h2>
                </Col>

                <Col>
                  Price with a discount:
                  <h2>

                  </h2>
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
                history.push(`/courseview/${props.location.state.courseid}`);
              }}
            ></Button>
          </Col>
          <Col className="text-right">
            <Button text="Submit"></Button>
          </Col>
        </Row>
      </Form>
      <br />
    </Container>
  );
}

export default SummaryOfPayment;
