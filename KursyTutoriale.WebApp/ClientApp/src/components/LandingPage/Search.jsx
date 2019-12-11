import React from 'react';
import Zoom from 'react-reveal/Zoom';
import { Button, Col, Container, Form, Input, Jumbotron, Row } from 'reactstrap';
import './Search.css';

const Search = () => (
  
  <Jumbotron fluid className="jumbotron_bg">
    <Zoom duration="200">
    <Container className="Container">
      <Row>
        <Col className="d-none d-lg-flex justify-content-center">
            <span className="d-block pb-4 h2 text-dark">Search for courses!</span>
        </Col>
      </Row>
      <Row>
        <Col className="d-none d-lg-flex justify-content-center">
            <Form inline>
                <Input type="search" className="form-control-lg" placeholder="Search by course name" />
                <Button type="submit" size="lg" color="primary" outline><span role="img" aria-label="">🔍</span></Button>
            </Form>
        </Col>
      </Row>
    </Container></Zoom>
    </Jumbotron>
);

export default Search;
