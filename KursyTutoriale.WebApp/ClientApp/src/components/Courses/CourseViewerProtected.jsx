import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Row,
  CardBody,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import classnames from 'classnames';

import { useHistory, Link } from 'react-router-dom';
import './style.css';
import Modules from './Modules';

import Button from '../../layouts/CSS/Button/Button';
import { UserService } from '../../api/Services/UserService';


const CourseViewerProtected = (props) => {
  const history = useHistory();
  const [ownerUserName, setOwnerUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const course = { ...props.course };


  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      UserService.getUserProfileById(course.ownerId).then((response) => {
        setOwnerUserName(response.data.username);
      });

    }
  }, [props.id]);


  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
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
                  isParticipating={true}
                />
              </CardBody>
            </TabPane>
          </TabContent>
        </Row>


      </Jumbotron>

     
      <Button
        text="Back"
        onClick={() => {
          history.goBack();
        }}
      />

    </Container>
  );
};
export default CourseViewerProtected;
