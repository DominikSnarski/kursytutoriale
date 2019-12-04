import React from 'react';
import {
    Container, Row, Col, Button,
    ListGroup, ListGroupItem, UncontrolledCollapse
} from 'reactstrap';
import './style.css';
import LessonsList from './LessonsList';


const Modules = (props) => (
    <Container fluid>
            <ListGroup style={{ borderColor: '#9dd2e2' }}>
                {props.modules.map(item =>
                    <Row className="d-flex justify-content-center mb-2">
                        <Col>
                            <Button color="info" id={"toggler" + item.index} size="lg" block>{item.title}</Button>
                            <UncontrolledCollapse toggler={"#toggler" + item.index}>
                                <LessonsList toggleLesson={props.toggleLesson} lessons={item.lessons} />
                            </UncontrolledCollapse>
                        </Col>
                    </Row>
                )}

            </ListGroup>
    </Container>
);

export default Modules;
