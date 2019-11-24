import React from 'react';
import {
    Jumbotron, Button, Container, Col, Row, Card, CardHeader, CardBody,
    ListGroup, ListGroupItem, CardText, UncontrolledCollapse, Progress, CardTitle
} from 'reactstrap';
import { Fade } from 'react-reveal';
import './style.css';


const Lesson = () => (
    <Container>
                <Card>
                    <CardBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                        similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                        dignissimos esse fuga! Minus, alias.
                                    </CardBody>

                    <Row>
                        <Col className="ml-2 mb-2">
                            <Card body style={{ backgroundColor: '#7CC3D8', borderColor: '#7CC3D8' }}>
                                <CardTitle>Lesson 1</CardTitle>
                                <CardText>You learn how to use reactstrap.</CardText>
                                <Button>Let's go</Button>
                            </Card>
                        </Col>
                        <Col className="mr-2 mb-2">
                            <Card body style={{ backgroundColor: '#7CC3D8', borderColor: '#7CC3D8' }}>
                                <CardTitle>Lesson 2</CardTitle>
                                <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni. Max. char in Lesson desc = 50</CardText>
                                <Button>Let's go</Button>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="ml-2 mb-2">
                            <Card body style={{ backgroundColor: '#7CC3D8', borderColor: '#7CC3D8' }}>
                                <CardTitle>Lesson 3</CardTitle>
                                <CardText>You learn how to use reactstrap.</CardText>
                                <Button>Let's go</Button>
                            </Card>
                        </Col>
                        <Col className="mr-2 mb-2">
                            <Card body style={{ backgroundColor: '#7CC3D8', borderColor: '#7CC3D8' }}>
                                <CardTitle>Lesson 4</CardTitle>
                                <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni. Max. char in Lesson desc = 50</CardText>
                                <Button>Let's go</Button>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="ml-2 mb-2">
                            <Card body style={{ backgroundColor: '#7CC3D8', borderColor: '#7CC3D8' }}>
                                <CardTitle>Lesson 5</CardTitle>
                                <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni. Max. char in Lesson desc = 50</CardText>
                                <Button>Let's go</Button>
                            </Card>
                        </Col>
                        <Col className="mr-2 mb-2">
                            <Card body style={{ backgroundColor: '#7CC3D8', borderColor: '#7CC3D8' }}>
                                <CardTitle>Lesson 6</CardTitle>
                                <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni. Max. char in Lesson desc = 50</CardText>
                                <Button>Let's go</Button>
                            </Card>
                        </Col>
                    </Row>

                </Card>
    </Container>
);

export default Lesson;
