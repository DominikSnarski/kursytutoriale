import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, Nav, Navbar, NavItem, NavLink, Row } from 'reactstrap';
import { UserContext } from '../../contexts/UserContext';



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
                  <Link to="/" className="font-weight-bold">Home</Link>
                </NavItem>

                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" href="#Courses">Courses</NavLink>
                </NavItem>

                <NavItem className="d-flex align-items-center">
                  <Link className="font-weight-bold" to={"/addNewCourse"}>Add New Course</Link>
                </NavItem>

              </Nav>
            </Col>
            <Col className="d-none d-lg-flex justify-content-end">

              {userContext.authenticated &&
                <Button color="warning" outline>{userContext.username}</Button>}

              <Form inline>
                <Link to="/signin"><Button type="button" color="primary" outline >Sign in</Button></Link>
              </Form>

              <Form inline>
                <Link to="/register"><Button type="button" color="primary" outline >Register</Button></Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
