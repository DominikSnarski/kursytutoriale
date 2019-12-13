import React from 'react';
import CoursesList from "./CoursesList";
import Search from './Search';
import Featured from './Featured';
import { Container, Jumbotron, Row, Col } from "reactstrap";

const LandingPage = props => {
    return(
        <>
            <Search />
            <Container className="px-0">
                    <Jumbotron fluid className="Container">
                        <Featured  />
                        <Jumbotron className="Container" id="Courses"></Jumbotron>
                        <Row>
                            <Col className="d-none d-lg-flex justify-content-center">
                                <CoursesList/>
                            </Col>
                        </Row>
                    </Jumbotron>
            </Container>
        </>
    );
}

export default LandingPage;