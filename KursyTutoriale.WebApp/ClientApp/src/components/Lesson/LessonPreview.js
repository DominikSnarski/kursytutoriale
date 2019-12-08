import React from 'react';
import {
    Jumbotron, Button, Container, Col, Row, Alert
} from 'reactstrap';
import { Fade, Zoom } from 'react-reveal';
import { Link } from 'react-router-dom'

class LessonPreview extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props.items);
    }

    render() {
        return (
            <Container className='Container'>

                <Zoom left duration="200">
                    <Alert color="primary" className="text-center">
                        Lesson preview
                    </Alert>
                </Zoom>

                <Fade left duration="200">

                    <Jumbotron fluid className='jumbotron_bg'>
                        <span className='d-lg-flex justify-content-center d-block h2 text-dark'>{this.props.title}</span>
                    </Jumbotron>

                    <Jumbotron className='courses_bg pr-4'>

                        {this.props.items.map(item =>

                            <div>
                                
                                {item.name == 'text' && item.value}{' '}
                                
                                {item.name == 'image' &&
                                    <Row>
                                        <Col className="d-flex justify-content-center mb-2">
                                            <img src={item.value} alt={item.alt} />
                                        </Col>
                                    </Row>
                                }

                                {item.name == 'video' &&
                                    <Row>
                                        <Col className="d-flex justify-content-center mb-2">
                                            <video width="480" controls>
                                                <source src={item.value} type="video/mp4" />
                                                Your browser does not support HTML5 video.
                                            </video>
                                        </Col>
                                    </Row>
                                    
                                }
                            </div>)}

                        <Row className='mt-5'>
                            <Col >
                                <Button color='secondary' onClick={this.props.toggleLessonPreview}>Previous lesson</Button>
                            </Col>
                            <Col className='text-right'>
                                <Button color='secondary' onClick={this.props.toggleLessonPreview}>Next lesson</Button>
                            </Col>
                        </Row>

                    </Jumbotron>


                    <Row className='mt-5'>
                            <Col >
                            </Col>
                            <Col className='text-right'>
                            <Link to={{pathname:'/courseview', state:{courseID: "8b2d822d-e85e-4dc9-91d2-55e83559e7c6"}}}><Button color='secondary' onClick={this.props.toggleLesson}>Confirm and save</Button></Link>
                            </Col>
                        </Row>

                </Fade>
            </Container>
        );
    }


}
export default LessonPreview;
