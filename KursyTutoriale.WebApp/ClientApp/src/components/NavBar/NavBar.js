import React from 'react';


import {
  Container, Row, Col, Form, Button, Navbar, Nav,
  NavLink, NavItem
} from 'reactstrap';
import { UserContext } from '../Context/UserContext';


const NavBar = (props) => {
  const userContext = React.useContext(UserContext)

  return (
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

              </Nav>
            </Col>


            <Col className="d-none d-lg-flex justify-content-end">

              {userContext.authenticated &&
                <Button onClick={props.toggleProfile} color="warning" outline>{userContext.username}</Button>}


              <Form inline>

                <Button type="button" color="primary" outline onClick={props.toggleLessonEdit}>TEMPORARY</Button>
              </Form>


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
};

export default NavBar;
