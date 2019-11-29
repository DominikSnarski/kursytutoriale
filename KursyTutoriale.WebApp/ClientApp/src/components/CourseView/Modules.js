import React from 'react';
import {
    Container, Row,
    ListGroup, ListGroupItem, UncontrolledCollapse
} from 'reactstrap';
import './style.css';
import LessonsList from './LessonsList';


const Modules = (props) => (
    <Container>
        <Row>
            <h3>Modules</h3>
        </Row>

        <ListGroup style={{ borderColor: '#9dd2e2' }}>

            <ListGroupItem tag="button" id="toggler" style={{ backgroundColor: '#53A6BE' }}>Module 2</ListGroupItem>
            <UncontrolledCollapse toggler="#toggler">
                <LessonsList toggleLesson={props.toggleLesson}/>
            </UncontrolledCollapse>

            <ListGroupItem tag="button" id="toggler1" style={{ backgroundColor: '#53A6BE' }}>Module 3</ListGroupItem>
            <UncontrolledCollapse toggler="#toggler1">
                <LessonsList />
            </UncontrolledCollapse>

            <ListGroupItem tag="button" id="toggler2" style={{ backgroundColor: '#53A6BE' }}>Module 4</ListGroupItem>
            <UncontrolledCollapse toggler="#toggler2">
                <LessonsList />
            </UncontrolledCollapse>

            <ListGroupItem tag="button" id="toggler3" style={{ backgroundColor: '#53A6BE' }}>Module 5</ListGroupItem>
            <UncontrolledCollapse toggler="#toggler3">
                <LessonsList />
            </UncontrolledCollapse>

            <ListGroupItem tag="button" id="toggler4" style={{ backgroundColor: '#53A6BE' }}>Module 6</ListGroupItem>
            <UncontrolledCollapse toggler="#toggler4">
                <LessonsList />
            </UncontrolledCollapse>

        </ListGroup>
    </Container>
);

export default Modules;
