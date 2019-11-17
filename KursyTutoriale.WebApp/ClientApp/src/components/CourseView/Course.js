import React from 'react';
import {
    Jumbotron, Button, Container, Col, Row, Card, CardHeader, CardBody,
    ListGroup, ListGroupItem, CardText, UncontrolledCollapse, Progress, CardTitle
} from 'reactstrap';
import { Fade, Carousel } from 'react-reveal';
import './style.css';
import makeCarousel from 'react-reveal/makeCarousel';
// we'll need the Slide component for sliding animations
// but you can use any other effect
import Slide from 'react-reveal/Slide';


class Course extends React.Component {

    constructor() {
        super();
    }


    render() {
        return (
            <Container className="Container">
                <Fade left>

                    <Jumbotron fluid className="jumbotron_bg">
                        <span className="d-lg-flex justify-content-center d-block h2 text-dark">Course Name</span>
                    </Jumbotron>

                    <Row className="mb-4">
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <img src="https://via.placeholder.com/480x320" alt="Generic placeholder image" />
                        </Col>
                    </Row>

                    <Jumbotron className="courses_bg pr-4">

                        <Row className="d-flex mb-3">
                            <Col className="column-text">
                                Author: <a href="/">User1</a>
                            </Col>
                            <Col className="column-text">
                                Category: Frontend
                            </Col>
                            <Col className="column-text">
                                Number of completions: 1234
                            </Col>
                        </Row>

                        <Row className="d-flex justify-content-center mb-2">
                            <Card fluid outline style={{ borderColor: '#9dd2e2' }}>
                                <CardHeader className="spans">Course details</CardHeader>
                                <CardBody style={{ backgroundColor: '#7CC3D8' }}>
                                    <CardText>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Row>

                        <Row className="d-flex justify-content-center mb-2">
                            Your progress into this course.
                        </Row>
                        <Progress value="25" className="mb-4" />

                        <Row>
                            <h3>Modules</h3>
                        </Row>
                        <ListGroup style={{ borderColor: '#9dd2e2' }}>

                            <ListGroupItem tag="button" id="toggler" style={{ backgroundColor: '#53A6BE' }}>Module 2</ListGroupItem>
                            <UncontrolledCollapse toggler="#toggler">
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
                                                <CardTitle>Lesson 6</CardTitle>
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
                            </UncontrolledCollapse>

                            <ListGroupItem tag="button" id="toggler1" style={{ backgroundColor: '#53A6BE' }}>Module 3</ListGroupItem>
                            <UncontrolledCollapse toggler="#toggler1">
                                <Card>
                                    <CardBody>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                                        similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                                        dignissimos esse fuga! Minus, alias.
                                    </CardBody>
                                </Card>
                            </UncontrolledCollapse>

                            <ListGroupItem tag="button" id="toggler2" style={{ backgroundColor: '#53A6BE' }}>Module 4</ListGroupItem>
                            <UncontrolledCollapse toggler="#toggler2">
                                <Card>
                                    <CardBody>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                                        similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                                        dignissimos esse fuga! Minus, alias.
                                    </CardBody>
                                </Card>
                            </UncontrolledCollapse>

                            <ListGroupItem tag="button" id="toggler3" style={{ backgroundColor: '#53A6BE' }}>Module 5</ListGroupItem>
                            <UncontrolledCollapse toggler="#toggler3">
                                <Card>
                                    <CardBody>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                                        similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                                        dignissimos esse fuga! Minus, alias.
                                    </CardBody>
                                </Card>
                            </UncontrolledCollapse>

                            <ListGroupItem tag="button" id="toggler4" style={{ backgroundColor: '#53A6BE' }}>Module 6</ListGroupItem>
                            <UncontrolledCollapse toggler="#toggler4">
                                <Card>
                                    <CardBody>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                                        similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                                        dignissimos esse fuga! Minus, alias.
                                    </CardBody>
                                </Card>
                            </UncontrolledCollapse>

                        </ListGroup>
                    </Jumbotron>

                    <Button color="secondary" onClick={this.props.toggle}>Back</Button>

                </Fade>
            </Container>
        );
    }


}
export default Course;
