import React from 'react';


import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';


const NavBar = () => (
  <header>
    <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>
      <Container>
        <Row noGutters className="position-relative w-100 align-items-center">

          <Col className="d-none d-lg-flex justify-content-start">
            <Nav className="mrx-auto" navbar>

              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/">Home</NavLink>
              </NavItem>

              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="#Courses">Courses</NavLink>
              </NavItem>

            </Nav>
          </Col>


          <Col className="d-none d-lg-flex justify-content-end">
            <Form inline>

              <Button type="button" color="primary" outline>Sign in</Button>
            </Form>

            <Form inline>

              <Button type="button" color="primary" outline>Register</Button>
            </Form>
          </Col>

          

        </Row>
      </Container>
    </Navbar>
  </header>
);

export default NavBar;
