import React from 'react';
import {
    Jumbotron, Button, Container, Col, Row, Card, CardHeader, CardBody,
    ListGroup, ListGroupItem, CardText, UncontrolledCollapse, Progress, CardTitle
} from 'reactstrap';
import { Fade } from 'react-reveal';
import './style.css';
import Lesson from './Lesson';


const Modules = () => (
    <Container>
        <Row>
            <h3>Modules</h3>
        </Row>

        <ListGroup style={{ borderColor: '#9dd2e2' }}>

            <ListGroupItem tag="button" id="toggler" style={{ backgroundColor: '#53A6BE' }}>Module 2</ListGroupItem>
            <UncontrolledCollapse toggler="#toggler">
                <Lesson />
            </UncontrolledCollapse>

            <ListGroupItem tag="button" id="toggler1" style={{ backgroundColor: '#53A6BE' }}>Module 3</ListGroupItem>
            <UncontrolledCollapse toggler="#toggler1">
                <Lesson />
            </UncontrolledCollapse>

            <ListGroupItem tag="button" id="toggler2" style={{ backgroundColor: '#53A6BE' }}>Module 4</ListGroupItem>
            <UncontrolledCollapse toggler="#toggler2">
                <Lesson />
            </UncontrolledCollapse>

            <ListGroupItem tag="button" id="toggler3" style={{ backgroundColor: '#53A6BE' }}>Module 5</ListGroupItem>
            <UncontrolledCollapse toggler="#toggler3">
                <Lesson />
            </UncontrolledCollapse>

            <ListGroupItem tag="button" id="toggler4" style={{ backgroundColor: '#53A6BE' }}>Module 6</ListGroupItem>
            <UncontrolledCollapse toggler="#toggler4">
                <Lesson />
            </UncontrolledCollapse>

        </ListGroup>
    </Container>
);

export default Modules;
