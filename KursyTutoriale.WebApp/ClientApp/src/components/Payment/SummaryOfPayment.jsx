import React from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Row, Col, Container } from 'reactstrap';
import AppRoutes from '../../routing/AppRoutes';

import Button from '../../layouts/CSS/Button/Button';
import Input from '../../layouts/CSS/InputField/InputField';

const SummaryOfPayment = (props) => {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    history.push(generatePath(AppRoutes.Payment, { courseId: props.courseId }));
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
                  <Label
                    type="text"
                    name="price"
                    id="price"
                    className="label"
                    text={props.price}
                  />
                </Col>

                <Col>
                  Discount:
                  <Input
                    type="text"
                    name="discount"
                    id="discount"
                    className="label"
                    text={props.discount}
                  />
                </Col>

                <Col>
                  Price with a discount:
                  <Label
                    type="text"
                    name="priceWithDiscount"
                    id="priceWithDiscount"
                    className="label"
                    text={''}
                  />
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
