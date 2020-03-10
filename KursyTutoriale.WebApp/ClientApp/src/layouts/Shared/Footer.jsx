import React from 'react';
import './style.css';

import { Container, Row, Col, NavItem, NavLink } from 'reactstrap';

const Footer = () => (
  <footer className="footer">
    <hr />
    <Container>
      <Row>
        <Col>
          <Row>
            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="#Home">
                Contact: KursyTutoriale@Dzbany.net
              </NavLink>
            </NavItem>
          </Row>
          <Row>
            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="#Home">
                Tel: +69 420 1337 2115
              </NavLink>
            </NavItem>
          </Row>
        </Col>
        <Col>
          <Row>
            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="#Home">
                Sample Text
              </NavLink>
            </NavItem>
          </Row>
          <Row>
            <NavItem className="d-flex align-items-cente">
              <NavLink className="font-weight-bold" href="#Home">
                Sample Text
              </NavLink>
            </NavItem>
          </Row>
          <Row>
            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="#Home">
                Sample Text
              </NavLink>
            </NavItem>
          </Row>
        </Col>
        <Col>
          <Row>
            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="#Home">
                Sample Text
              </NavLink>
            </NavItem>
          </Row>
          <Row>
            <NavItem className="d-flex align-items-cente">
              <NavLink className="font-weight-bold" href="#Home">
                Sample Text
              </NavLink>
            </NavItem>
          </Row>
          <Row>
            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="#Home">
                Sample Text
              </NavLink>
            </NavItem>
          </Row>
        </Col>
        <Col>
          <Row>
            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="#Home">
                Sample Text
              </NavLink>
            </NavItem>
          </Row>
          <Row>
            <NavItem className="d-flex align-items-cente">
              <NavLink className="font-weight-bold" href="#Home">
                Sample Text
              </NavLink>
            </NavItem>
          </Row>
          <Row>
            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="#Home">
                Sample Text
              </NavLink>
            </NavItem>
          </Row>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
