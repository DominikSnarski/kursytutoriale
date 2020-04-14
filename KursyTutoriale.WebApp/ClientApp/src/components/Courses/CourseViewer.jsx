import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
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
import { ObserverService } from '../../api/Services/ObserverService';
import Button from '../../layouts/CSS/Button/Button';

const CourseViewer = (props) => {
  const history = useHistory();
  const userContext = React.useContext(UserContext);
  const [course, setCourse] = useState({});
  const [isObserving, setObservation] = useState(false);
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
        ObserverService.isObserving(response.data.id).then((_response) => {
          setObservation(_response.data);
        });

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

  const handleButtonJoinCourseClick = () => {
    ObserverService.observe(course.id)
    .then(() => history.push('/'))
    .then(() => history.push(`/courseview/${course.id}`));
  }

  const handleButtonLeaveCourseClick = () => {
    ObserverService.unobserve(course.id)
    .then(() => history.push('/'))
    .then(() => history.push(`/courseview/${course.id}`));
  }

  const onStarClick = (nextValue) => {
    CourseService.addRating(course.id, userContext.userid, nextValue);
    setRating(nextValue);
    course.rating = nextValue;
  };
  const onStarHover = (nextValue) => {
    setRating(nextValue);

  };

  const onStarHoverOut = (nextValue) => {
    setRating(course.rating);
  };

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
      <Jumbotron fluid className="jumbotron_courseView">
        <h1>{course.title}</h1>
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
              onStarHoverOut={(nextValue, prevValue, name) =>
                onStarHoverOut(nextValue, prevValue, name)
              }
              name="rating"
              value={rating}
            />
          </Col>
        </Row>

        <Row className="d-flex mb-3">
          <Col className="column-text">Author: {}</Col>
          <Col className="column-text">
            Price: {course.price === 0 ? 'Free' : course.price} $
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

        <Row className="justify-content-center mb-2">
          <Col>
            <Card fluid outline style={{ borderColor: '#ffb606' }}>
              <CardHeader className="spans">Course details</CardHeader>
              <CardBody style={{ backgroundColor: '#f5dfae' }}>
                <CardText>{course.description}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center mb-2">
          Your progress into this course.
        </Row>
        <Progress color="warning" value={course.progress} className="mb-4" />

        <br />
        <Row>
          <h3 style={{ fontWeight: '900' }}>Modules</h3>
        </Row>
        <br />

        <Modules
          toggleLesson={props.toggleLesson}
          modules={course.modules}
          courseID={props.id}
          ownerID={course.ownerId}
          courseTitle={course.title}
          isObserving ={isObserving}
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
            <Button text="Send to verification" />
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
              <Button onClick={() => handleButtonPublishClick()} text="Publish"/>
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
              <Button onClick={() => handleButtonPublishNewVersionClick()} text="Publish New Version"/>
            </Row>
          </Container>
        )}

        {userContext.userid !== course.ownerId &&
        course.verified &&
        course.public &&
        isObserving === false && (
          <Container>
            <Row className="justify-content-md-center">
            </Row>
            <Row className="justify-content-md-center">
              <Button onClick={() => handleButtonJoinCourseClick()} text="Join Course"/>
            </Row>
          </Container>
        )}

        {userContext.userid !== course.ownerId &&
        course.verified &&
        course.public &&
        isObserving === true && (
          <Container>
            <Row className="justify-content-md-center">
            </Row>
            <Row className="justify-content-md-center">
              <Button onClick={() => handleButtonLeaveCourseClick()} text="Leave Course"/>
            </Row>
          </Container>
        )}
      <Button
        text="Back"
        onClick={() => {
          history.goBack();
        }}
      />
    </Container>
  );
};
export default CourseViewer;
