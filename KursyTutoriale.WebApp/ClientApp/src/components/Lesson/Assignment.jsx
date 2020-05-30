import React, { useState } from 'react';
import { Container, Row, Col, Collapse, FormGroup, Input } from 'reactstrap';
import Button from '../../layouts/CSS/Button/Button';

function Assignment({assignment}) {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [ratingField, setRatingField] = useState(0);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <tbody>
      <tr onClick={() => toggle()} style={{ cursor: 'pointer' }}>
        <td>{assignment.reporter}</td>
        <td>{assignment.date}</td>
        <td>{assignment.content.length > 25 && `${assignment.content.substring(0, 25)}...`}
        {assignment.content.length < 25 && assignment.content.substring(0, 25)}</td>
        <td>{assignment.rating}</td>
      </tr>
      <Collapse isOpen={isOpen}>
        <Container>
          <Row>
            <Col className="additional">{assignment.content}</Col>
          </Row>

          <Row>
            <Col className="d-flex justify-content-center mb-2">
              {assignment.description}
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <FormGroup>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  className="input_field"
                >
                  <option onClick={() => setRatingField(0)}>0</option>
                  <option onClick={() => setRatingField(1)}>1</option>
                  <option onClick={() => setRatingField(1)}>2</option>
                  <option onClick={() => setRatingField(1)}>3</option>
                  <option onClick={() => setRatingField(1)}>4</option>
                  <option onClick={() => setRatingField(1)}>5</option>
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <Button text="Rate it"/>
            </Col>
          </Row>
        </Container>
      </Collapse>
    </tbody>
  );
}
export default Assignment;
