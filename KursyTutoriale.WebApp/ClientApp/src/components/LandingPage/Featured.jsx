import classnames from 'classnames';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Spinner,
  Row,
  Col,
  Alert,
} from 'reactstrap';
import Featured2 from './Showcase/Featured';
// eslint-disable-next-line import/no-named-as-default
import CourseService from '../../api/Services/CourseService';
import './Featured.css';

const Featured = () => {
  const COURSE_COUNT = 3;
  const [activeTab, setActiveTab] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState(false);
  const [featuresLoaded, setFeaturesLoaded] = useState(false);
  const [topCourses, setTopCourses] = useState([]);
  const [mostPopularCourses, setMosstPopularCourses] = useState([]);

  const toggleTabs = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      CourseService.getFeaturedCourses(COURSE_COUNT).then((response) => {
        setMosstPopularCourses(response.data.mostPopular);
        setTopCourses(response.data.topRated);
        setFeaturesLoaded(true);
      });
    }
  }, []);

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
  if (!featuresLoaded) {
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
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggleTabs('1');
            }}
          >
            Most popular courses
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggleTabs('2');
            }}
          >
            Top courses
          </NavLink>
        </NavItem>
      </Nav>

      {mostPopularCourses.length > 0 ? (
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Featured2 coursesList={mostPopularCourses} />
          </TabPane>
        </TabContent>
      ) : (
        <TabContent activeTab={activeTab}>
          <TabPane tabId="2">
            Sorry but we could not find any courses here.
          </TabPane>
        </TabContent>
      )}

      {topCourses.length > 0 ? (
        <TabContent activeTab={activeTab}>
          <TabPane tabId="2">
            <Featured2 coursesList={topCourses} />
          </TabPane>
        </TabContent>
      ) : (
        <TabContent activeTab={activeTab}>
          <TabPane tabId="2">
            Sorry but we could not find any courses here.
          </TabPane>
        </TabContent>
      )}
    </Container>
  );
};
export default Featured;
