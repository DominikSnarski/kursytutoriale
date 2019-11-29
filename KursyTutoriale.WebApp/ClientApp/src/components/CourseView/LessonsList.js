import React from 'react';
import {
    Jumbotron, Button, Container, Col, Row, Card, CardHeader, CardBody,
    ListGroup, ListGroupItem, CardText, UncontrolledCollapse, Progress, CardTitle
} from 'reactstrap';
import { Fade } from 'react-reveal';
import './style.css';


const LessonsList = (props) => (
    <Container fluid>
                <Card>
                    <CardBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                        similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                        dignissimos esse fuga! Minus, alias.
                    </CardBody>

                    <Row>
                        <Col className="ml-2 mb-2 mr-2">
                            <Card  body style={{ backgroundColor: '#7CC3D8', borderColor: '#7CC3D8' }} >
                                <CardTitle>Lesson 1</CardTitle>
                                <CardText className="card-height">You learn how to use reactstrap.</CardText>
                                <Button onClick={props.toggleLesson}>Let's go</Button>
                            </Card>
                        </Col>
                    </Row>

                    <Row flex-grow-1>
                        <Col className="ml-2 mb-2 mr-2">
                            <Card body style={{ backgroundColor: '#7CC3D8', borderColor: '#7CC3D8' }}>
                                <CardTitle>Lesson 2</CardTitle>
                                <CardText className="card-height">You learn how to use reactstrap.</CardText>
                                <Button onClick={props.toggleLesson}>Let's go</Button>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="ml-2 mb-2 mr-2">
                            <Card body style={{ backgroundColor: '#7CC3D8', borderColor: '#7CC3D8' }}>
                                <CardTitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni. <b>Lesson title max 100 characters</b></CardTitle>
                                <CardText className="card-height">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni. Max. char in Lessons Lorem ipsum dolor sit amet consectetur length  <b>Set LessonDescriptionMaximumCharacters=250</b></CardText>
                                <Button onClick={props.toggleLesson}>Let's go</Button>
                            </Card>
                        </Col>
                    </Row>

                </Card>
    </Container>
);

export default LessonsList;
