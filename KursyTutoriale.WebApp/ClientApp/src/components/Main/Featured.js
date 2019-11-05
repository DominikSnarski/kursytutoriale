import React, { useState } from 'react';
import './style.css';
import {
    Card, CardImg, CardText, CardBody, Jumbotron, CardImgOverlay,
    CardTitle, CardSubtitle, Button, Container, Col, Row,
} from 'reactstrap';
import Details from '../Details/Details';
import { Fade } from 'react-reveal';


const Featured = () => {

    const [showDetails, setShowDetails] = useState(false);

    const toggle = () => setShowDetails(!showDetails);

    if (showDetails)
        return (
            <Fade right>
                <Container className="Container">
                    <Jumbotron fluid className="jumbotron_bg">
                        <span className="d-lg-flex justify-content-center d-block h2 text-dark">Course Details</span>
                    </Jumbotron>
                    <Jumbotron fluid className="courses_bg">
                        <Details title="Item1" category="Cat1" tags={["tag1"]} price="free" />
                        <div class="float-right mr-4">
                            <Button color="primary" onClick={toggle}>Go to course's page</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Back</Button>
                        </div>
                    </Jumbotron>
                </Container>
            </Fade>
        );

    return (
        <Container className="Container">
            <Fade left>
                <Jumbotron fluid className="jumbotron_bg">
                    <span className="d-lg-flex justify-content-center d-block h2 text-dark">Featured courses</span>
                </Jumbotron>
                <Row>
                    <Col xs="6" sm="4">
                        <div>
                            <Card inverse className="m-2"
                                onClick={toggle}
                                style={{ cursor: 'pointer' }}>
                                <CardImg width="100%" src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png" alt="Card image cap" />
                                <CardImgOverlay>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                </CardImgOverlay>
                            </Card>
                        </div>
                    </Col>
                    <Col xs="6" sm="4">
                        <div>
                            <Card inverse className="m-2"
                                onClick={toggle}
                                style={{ cursor: 'pointer' }}>
                                <CardImg width="100%" src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png" alt="Card image cap" />
                                <CardImgOverlay>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                </CardImgOverlay>
                            </Card>
                        </div>
                    </Col>
                    <Col xs="6" sm="4">
                        <div>
                            <Card inverse className="m-2"
                                onClick={toggle}
                                style={{ cursor: 'pointer' }}>
                                <CardImg width="100%" src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png" alt="Card image cap" />
                                <CardImgOverlay>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                </CardImgOverlay>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" sm="4">
                        <div>
                            <Card inverse className="m-2"
                                onClick={toggle}
                                style={{ cursor: 'pointer' }}>
                                <CardImg width="100%" src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png" alt="Card image cap" />
                                <CardImgOverlay>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                </CardImgOverlay>
                            </Card>
                        </div>
                    </Col>
                    <Col xs="6" sm="4">
                        <div>
                            <Card inverse className="m-2"
                                onClick={toggle}
                                style={{ cursor: 'pointer' }}>
                                <CardImg width="100%" src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png" alt="Card image cap" />
                                <CardImgOverlay>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                </CardImgOverlay>
                            </Card>
                        </div>
                    </Col>
                    <Col xs="6" sm="4">
                        <div>
                            <Card inverse className="m-2"
                                onClick={toggle}
                                style={{ cursor: 'pointer' }}>
                                <CardImg width="100%" src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png" alt="Card image cap" />
                                <CardImgOverlay>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                </CardImgOverlay>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Fade>
        </Container>
    );
}
export default Featured;
