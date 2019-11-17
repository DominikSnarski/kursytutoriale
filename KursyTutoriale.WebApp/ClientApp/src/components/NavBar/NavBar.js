import React from 'react';


import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';


const NavBar = (props) => (
  <header className="page">
    <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>
      <Container>
        <Row noGutters className="position-relative w-100 align-items-center">

          <Col className="d-none d-lg-flex justify-content-start">
            <Nav className="mrx-auto" navbar>

              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="#Home">Home</NavLink>
              </NavItem>

              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="#Courses">Courses</NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="font-weight-bold">
                  Categories
              </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                </DropdownItem>
                  <DropdownItem>
                    Option 2
                </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

            </Nav>
          </Col>


          <Col className="d-none d-lg-flex justify-content-end">
            <Form inline>

              <Button type="button" color="primary" outline onClick={props.toggleSignIn}>Sign in</Button>
            </Form>

            <Form inline>

              <Button type="button" color="primary" outline onClick={props.toggleSignUp}>Register</Button>
            </Form>
          </Col>



        </Row>
      </Container>
    </Navbar>
  </header>
);

export default NavBar;
