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
import StarRating from 'react-star-rating-component';
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
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      CourseService.getCourse(props.id).then((response) => {
        setCourse(response.data);
        setCourseLoaded(true);
        setRating(response.data.rating);
        CourseService.incrementViewCount(props.id);
      });
    }
  }, [props.id]);

  const handleButtonPublishClick = () => {
    CourseService.publishCourse(course.id)
      .then(() => history.push('/'))
      .then(() => history.push(`/courseview/${course.id}`));
  };

  const handleButtonPublishNewVersionClick = () => {
    CourseService.publishNewVersionOfCourse(course.id)
      .then(() => history.push('/'))
      .then(() => history.push(`/courseview/${course.id}`));
  };

  const onStarClick = (nextValue) => {
    CourseService.addRating(course.id, userContext.userid, nextValue);
    setRating(nextValue);
  };
  const onStarHover = () => {};

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
          <Col>
            <StarRating
              onStarClick={(nextValue, prevValue, name) =>
                onStarClick(nextValue, prevValue, name)
              }
              onStarHover={(nextValue, prevValue, name) =>
                onStarHover(nextValue, prevValue, name)
              }
              name="rating"
              value={rating}
            />
          </Col>
        </Row>

        <Row className="d-flex mb-3">
          <Col className="column-text">Author: {}</Col>
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
          <Col className="column-text">Views: {course.popularity}</Col>
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
      {userContext.userid === course.ownerId &&
        course.verified &&
        !course.public && (
          <Container>
            <Row className="justify-content-md-center">
              <Alert>
                Your course will NOT be available if it is not published. If you
                think it is ready click publish button to allow other user to
                see it.
              </Alert>
            </Row>
            <Row className="justify-content-md-center">
              <Button onClick={() => handleButtonPublishClick()}>
                Publish
              </Button>
            </Row>
          </Container>
        )}
      {userContext.userid === course.ownerId &&
        course.verified &&
        course.public && (
          <Container>
            <Row className="justify-content-md-center">
              <Alert>
                Changes you have added to your course will not be visible to
                other users. If you want them to see new content publish new
                version of your course.
              </Alert>
            </Row>
            <Row className="justify-content-md-center">
              <Button onClick={() => handleButtonPublishNewVersionClick()}>
                Publish New Version
              </Button>
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
