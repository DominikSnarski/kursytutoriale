import React from 'react';
import './style.css';
import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, Jumbotron
} from 'reactstrap';


const Search = () => (
  <header><Jumbotron fluid className="jumbotron_bg">
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
                <Button type="submit" size="lg" color="primary" outline>🔍</Button>
            </Form>
        </Col>
      </Row>
    </Container>
    </Jumbotron>
  </header>
);

export default Search;
