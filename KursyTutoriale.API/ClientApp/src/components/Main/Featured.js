import React, {useState} from 'react';
import './style.css';
import {
    Card, CardImg, CardText, CardBody, Jumbotron, CardImgOverlay,
    CardTitle, CardSubtitle, Button, Container, Col, Row,
} from 'reactstrap';
import Details from '../Details/Details';


const Featured = () => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (

        <Container className="Container">
            <Jumbotron fluid className="jumbotron_bg">
                <span className="d-lg-flex justify-content-center d-block h2 text-dark">Featured courses.</span>
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
            <Details
                isOpen={modal}
                toggle={toggle}
                title="we zadzialaj"
                category="ffs"
                tags={["tag1", "tag2"]}
                price="Free"
            />
        </Container>

    );
}
export default Featured;
