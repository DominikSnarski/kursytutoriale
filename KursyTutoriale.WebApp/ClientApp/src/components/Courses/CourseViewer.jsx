import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Button,
  Container,
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Progress,
  Alert,
  Spinner,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './style.css';
import Modules from './Modules';
import { CourseService } from '../../api/Services/CourseService';

const CourseViewer = (props) => {
  const history = useHistory();
  const userContext = React.useContext(UserContext);
  const [course, setCourse] = useState({});
  const [courseLoaded, setCourseLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      CourseService.getCourse(props.id).then((response) => {
        setCourse(response.data);
        setCourseLoaded(true);
      });
    }
  }, [props.id]);

  if (error) {
    return (
      <Row>
        <Col xs="6" sm="4"></Col>
        <Col sm="12" md={{ size: 10, offset: 1 }}>
          <Alert color="danger">Something went terribly wrong.</Alert>
        </Col>
        <Col sm="4"></Col>
      </Row>
    );
  }

  if (!courseLoaded) {
    return (
      <Row>
        <Col xs="6" sm="4"></Col>
        <Col xs="6" sm="4">
          <Spinner
            className="d-lg-flex d-block h2"
            style={{ width: '3rem', height: '3rem' }}
            color="primary"
          />
        </Col>
        <Col sm="4"></Col>
      </Row>
    );
  }
  return (
    <Container className="Container">
      <Jumbotron fluid className="jumbotron_bg">
        <span className="d-lg-flex justify-content-center d-block h2 text-dark">
          {course.title}
        </span>
      </Jumbotron>
      <Row className="mb-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <img
            src="https://via.placeholder.com/480x320"
            alt="Generic placeholder"
          />
        </Col>
      </Row>

      <Jumbotron className="courses_bg pr-4">
        <Row className="d-flex mb-3">
          <Col className="column-text">
            State of course:{' '}
            {!course.verified ? (
              <text
                style={{
                  backgroundColor: 'red',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
              >
                {' '}
                Not verified
              </text>
            ) : (
              <text
                style={{
                  backgroundColor: 'lightgreen',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
              >
                Verified
              </text>
            )}
          </Col>
          <Col className="column-text">
            Type:{' '}
            {!course.public ? (
              <text
                style={{
                  backgroundColor: 'red',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
              >
                Private
              </text>
            ) : (
              <text
                style={{
                  backgroundColor: 'lightgreen',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
              >
                Public
              </text>
            )}
          </Col>
        </Row>

        <Row className="d-flex mb-3">
          <Col className="column-text">Author: {course.ownerId}</Col>
          <Col className="column-text">
            Price: {course.price === 0 ? 'Free' : course.price}$
          </Col>
        </Row>

        <Row className="d-flex mb-3">
          <Col className="column-text">
            Tags:{' '}
            {course.tags.map((txt, i) => (
              <span key={i}> {txt.id}</span>
            ))}
          </Col>
          <Col className="column-text">
            Number of completions: {course.popularity}
          </Col>
        </Row>

        <Row className="d-flex justify-content-center mb-2">
          <Col>
            <Card fluid outline style={{ borderColor: '#9dd2e2' }}>
              <CardHeader className="spans">Course details</CardHeader>
              <CardBody style={{ backgroundColor: '#7CC3D8' }}>
                <CardText>{course.description}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center mb-2">
          <Col>
            <Card fluid outline style={{ borderColor: '#9dd2e2' }}>
              <CardHeader className="spans">Course details</CardHeader>
              <CardBody style={{ backgroundColor: '#7CC3D8' }}>
                <CardText>{course.description}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center mb-2">
          Your progress into this course.
        </Row>
        <Progress value="25" className="mb-4" />

        <Row>
          <h3>Modules</h3>
        </Row>

        <Modules
          toggleLesson={props.toggleLesson}
          modules={course.modules}
          courseID={props.id}
          ownerID={course.ownerId}
        />
      </Jumbotron>
      {userContext.userid === course.ownerId && !course.verified && (
        <Container>
          <Row className="justify-content-md-center">
            <Alert>
              Your course will NOT be available if it is not verified. If you
              think it is ready send it to verification!
            </Alert>
          </Row>
          <Row className="justify-content-md-center">
            <Button>Send to verification</Button>
          </Row>
        </Container>
      )}
      <Button
        color="secondary"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </Button>
    </Container>
  );
};
export default CourseViewer;
