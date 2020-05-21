import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Row,
  CardBody,
  CardText,
  Progress,
  Alert,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import StarRating from 'react-star-rating-component';
import { useHistory, Link, generatePath } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './style.css';
import Modules from './Modules';
import { CourseService } from '../../api/Services/CourseService';
import { ParticipantService } from '../../api/Services/ParticipantService';
import Button from '../../layouts/CSS/Button/Button';
import { UserService } from '../../api/Services/UserService';
import DiscountGenerator from './DiscountGenerator';
import Chat from './Chat';

import AppRoutes from '../../routing/AppRoutes';
import Comments from '../Comments/Comments';

const CourseViewer = (props) => {
  const history = useHistory();
  const userContext = React.useContext(UserContext);

  const [ownerUserName, setOwnerUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const course = { ...props.course };
  const [rating, setRating] = useState(0);
  const [isParticipating, setIsParticipating] = useState(false);

  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      UserService.getUserProfileById(course.ownerId).then((response) => {
        setOwnerUserName(response.data.username);
      });
      ParticipantService.isParticipating(course.id).then((response) => {
        setIsParticipating(response.data);
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
    if (course.price !== 0) {
      history.push(generatePath(AppRoutes.Payment, { courseId: course.id }));
    } else {
      ParticipantService.addParticipant(course.id)
        .then(() => history.push('/'))
        .then(() => history.push(`/courseview/${course.id}`));
    }
  };

  const handleButtonLeaveCourseClick = () => {
    ParticipantService.removeParticipant(course.id)
      .then(() => history.push('/'))
      .then(() => history.push(`/courseview/${course.id}`));
  };

  const onStarClick = (nextValue) => {
    CourseService.addRating(course.id, userContext.userid, nextValue);
    setRating(nextValue);
    course.rating = nextValue;
  };
  const onStarHover = (nextValue) => {
    setRating(nextValue);
  };

  const onStarHoverOut = () => {
    setRating(course.rating);
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const handleButtonSendToVerificationClick = () => {
    CourseService.sendToVerification(course.id)
      .then(() => history.push('/'))
      .then(() => history.push(`/courseview/${course.id}`));
  };

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

      {(isParticipating || userContext.userid === course.ownerId) && (
        <Chat courseid={course.id} username={userContext.username} />
      )}

      <Jumbotron className="bg pr-4">
        <Row className="d-flex mb-3">
          <Col className="column-text">
            State of course:{' '}
            {course.verified === 0 && (
              <text
                style={{
                  backgroundColor: 'red',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
              >
                {' '}
                Waiting for Verification
              </text>
            )}
            {course.verified === 1 && (
              <text
                style={{
                  backgroundColor: 'lightgreen',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
              >
                {' '}
                Verified
              </text>
            )}
            {course.verified === 2 && (
              <text
                style={{
                  backgroundColor: 'red',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
              >
                {' '}
                Rejected
              </text>
            )}
            {course.verified === 3 && (
              <text
                style={{
                  backgroundColor: 'red',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
              >
                {' '}
                Blocked
              </text>
            )}
            {course.verified === 4 && (
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
          <Col className="column-text">
            Author:
            <Link
              to={`/userProfile/${course.ownerId}`}
              style={{
                color: '#0f0f0f',
                fontWeight: 'bold',
              }}
              className="link"
            >
              {ownerUserName}
            </Link>
          </Col>
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

        <Row>
          <Nav tabs>
            <NavItem className="tabItem">
              <NavLink
                className={classnames({
                  active: activeTab === '1',
                })}
                onClick={() => {
                  toggle('1');
                }}
              >
                <l className="stats">Details</l>
              </NavLink>
            </NavItem>
            <NavItem className="tabItem">
              <NavLink
                className={classnames({
                  active: activeTab === '2',
                })}
                onClick={() => {
                  toggle('2');
                }}
              >
                <l className="stats">Modules</l>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab} style={{ width: '100%' }}>
            <TabPane tabId="1" className="description">
              <CardBody style={{ backgroundColor: '#f5dfae' }}>
                <CardText style={{ color: 'black' }}>
                  {course.description}
                </CardText>
              </CardBody>
            </TabPane>
            <TabPane tabId="2" className="modules">
              <CardBody style={{ backgroundColor: '#f5dfae' }}>
                <Modules
                  toggleLesson={props.toggleLesson}
                  modules={course.modules}
                  courseID={props.id}
                  ownerID={course.ownerId}
                  courseTitle={course.title}
                  isParticipating={props.isParticipating}
                />
              </CardBody>
            </TabPane>
          </TabContent>
        </Row>

        {userContext.authenticated ||
          (isParticipating && (
            <Container>
              <Row className="d-flex justify-content-center mb-2">
                Your progress into this course.
              </Row>
              <Progress
                color="warning"
                value={course.progress}
                className="mb-4"
              />
            </Container>
          ))}

        {course.progress === 0 && (
          <Container>
            <Row className="d-flex justify-content-center mb-2">
              Congratulations! You have finished this course. Now you can take
              anonymous survey about this course to help the author in upgrading
              it.
            </Row>
            <Row className="d-flex justify-content-center mb-2">
              <Link
                to={{
                  pathname: AppRoutes.Survey,
                  state: {
                    courseID: props.id,
                  },
                }}
              >
                <Button text="Take survey" />
              </Link>
            </Row>
          </Container>
        )}

        {userContext.userid === course.ownerId && (
          <DiscountGenerator
            owner={course.ownerId}
            course={course.title}
            id={props.id}
          />
        )}
      </Jumbotron>

      {userContext.userid === course.ownerId && course.verified === 4 && (
        <Container>
          <Row className="justify-content-md-center">
            <Alert>
              Your course will NOT be available if it is not verified. If you
              think it is ready send it to verification!
            </Alert>
          </Row>
          <Row className="justify-content-md-center">
            <Button
              onClick={() => handleButtonSendToVerificationClick()}
              text="Send to verification"
            />
          </Row>
        </Container>
      )}
      {userContext.userid === course.ownerId && course.verified === 0 && (
        <Container>
          <Row className="justify-content-md-center">
            <Alert>Your course is waiting for verification.</Alert>
          </Row>
          <Row className="justify-content-md-center"></Row>
        </Container>
      )}
      {userContext.userid === course.ownerId &&
        course.verified === 1 &&
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
              <Button
                onClick={() => handleButtonPublishClick()}
                text="Publish"
              />
            </Row>
          </Container>
        )}
      {userContext.userid === course.ownerId &&
        course.verified === 1 &&
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
              <Button
                onClick={() => handleButtonPublishNewVersionClick()}
                text="Publish New Version"
              />
            </Row>
          </Container>
        )}

      {userContext.userid !== course.ownerId &&
        course.verified === 1 &&
        course.public &&
        !props.isParticipating && (
          <Container>
            <Row className="justify-content-md-center"></Row>
            <Row className="justify-content-md-center">
              <Button
                onClick={() => handleButtonJoinCourseClick()}
                text="Join Course"
              />
            </Row>
          </Container>
        )}

      {userContext.userid !== course.ownerId &&
        course.verified === 1 &&
        course.public &&
        props.isParticipating === true && (
          <Container>
            <Row className="justify-content-md-center"></Row>
            <Row className="justify-content-md-center">
              <Button
                onClick={() => handleButtonLeaveCourseClick()}
                text="Leave Course"
              />
            </Row>
          </Container>
        )}
      <Button
        text="Back"
        onClick={() => {
          history.goBack();
        }}
      />

      <Comments
        courseId={props.id}
        comments={props.comments}
        ownerId={course.ownerId}
      />
    </Container>
  );
};
export default CourseViewer;
