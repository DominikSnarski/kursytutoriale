import React from 'react';
import { Button, Col, Container, ListGroup, Row, UncontrolledCollapse } from 'reactstrap';
import LessonsList from './LessonsList';
import './style.css';


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
