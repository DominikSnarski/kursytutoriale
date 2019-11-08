import React from 'react';
import "./style.css"
import { Container, Row, Col, Jumbotron } from 'reactstrap';

const Details = (props) => (
  <Container>

    <Row>
      <Col className="d-flex justify-content-center mb-2">
        <h2>{props.title}</h2>
      </Col>
    </Row>

    <Row>
      <Col className="d-flex justify-content-center mb-2">
        <img src="https://via.placeholder.com/320x200" alt="Generic placeholder image" />
      </Col>
    </Row>

    <Row>
      <Col className="additional">
        Category: {props.category};  Tags:{props.tags.map(txt => <span> {txt}</span>)};  Price: {props.price}
      </Col>
    </Row>

    <Row>
      <Col className="d-flex justify-content-center mb-2">
      {props.description}Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      </Col>
    </Row>
    
  </Container>
);

export default Details;