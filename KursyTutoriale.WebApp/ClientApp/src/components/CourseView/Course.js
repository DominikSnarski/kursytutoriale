import React from 'react';
import {
    Jumbotron, Button, Container, Col, Row, Card, CardHeader, CardBody,
    ListGroup, ListGroupItem, CardText, UncontrolledCollapse, Progress, CardTitle
} from 'reactstrap';
import { Fade } from 'react-reveal';
import './style.css';
import Modules from './Modules';


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

                        <Modules />
                    </Jumbotron>

                    <Button color="secondary" onClick={this.props.toggle}>Back</Button>

                </Fade>
            </Container>
        );
    }


}
export default Course;
