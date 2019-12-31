import React from 'react';
import {
    Jumbotron, Button, Container, Col, Row, Card, CardHeader, CardBody,
    CardText, Progress, Alert, Spinner
} from 'reactstrap';
import { Fade } from 'react-reveal';
import './style.css';
import Modules from './Modules';
import {CourseService} from '../../api/Services/CourseService';



class Course extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            courseid: props.match.params.id,
            course: null,
            courseLoaded: false,
            error: false
        }
        console.log(props.match.params.id);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        
        CourseService.getCourseUnverified(this.state.courseid)
        .then(response=> this.setState({
            course:response.data,
            courseLoaded: true
        })
        );
    }

    render() {

        if (this.state.error)
            return (
                <Row><Col xs="6" sm="4"></Col>
                    <Col sm="12" md={{ size: 10, offset: 1 }}><Alert color="danger">Something went terribly wrong.</Alert></Col>
                    <Col sm="4"></Col></Row>
            )

        if (!this.state.courseLoaded)
            return (
                <Row><Col xs="6" sm="4"></Col>
                    <Col xs="6" sm="4"><Spinner className="d-lg-flex d-block h2" style={{ width: '3rem', height: '3rem' }} color="primary" /></Col>
                    <Col sm="4"></Col></Row>
            )

        return (
            <Container className="Container">
                <Fade left duration="200">

                    <Jumbotron fluid className="jumbotron_bg">
                        <span className="d-lg-flex justify-content-center d-block h2 text-dark">{this.state.course.title}</span>
                    </Jumbotron>

                    <Row className="mb-4">
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <img src="https://via.placeholder.com/480x320" alt="Generic placeholder" />
                        </Col>
                    </Row>

                    <Jumbotron className="courses_bg pr-4">

                        <Row className="d-flex mb-3">
                            <Col className="column-text">
                                Author: {this.state.course.ownerId}
                            </Col>
                            <Col className="column-text">
                                Price: {this.state.course.price === 0 ? 'Free' : this.state.price}
                            </Col>
                        </Row>

                        <Row className="d-flex mb-3">
                            <Col className="column-text">
                                Tags: {this.state.course.tags.map(txt => <span> {txt.id}</span>)}
                            </Col>
                            <Col className="column-text">
                                Number of completions: {this.state.course.popularity}
                            </Col>
                        </Row>

                        <Row className="d-flex justify-content-center mb-2">
                            <Col>
                                <Card fluid outline style={{ borderColor: '#9dd2e2' }}>
                                    <CardHeader className="spans">Course details</CardHeader>
                                    <CardBody style={{ backgroundColor: '#7CC3D8' }}>
                                        <CardText>
                                            {this.state.course.description}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="d-flex justify-content-center mb-2">
                            Your progress into this course.
                        </Row>
                        <Progress value="25" className="mb-4" />

                        <Row >
                            <h3>Modules</h3>
                        </Row>

                        <Modules toggleLesson={this.props.toggleLesson} modules={this.state.course.modules} />
                    </Jumbotron>

                    <Row className='mt-5'>
                            <Col >
                                <Button color="secondary" onClick={this.props.toggle}>Back</Button>
                            </Col>
                            <Col className='text-right'>
                                <Button color="primary" onClick={this.props.toggle}>Send to verification</Button>  
                            </Col>
                    </Row>

                </Fade>
            </Container>
        );
    }


}
export default Course;