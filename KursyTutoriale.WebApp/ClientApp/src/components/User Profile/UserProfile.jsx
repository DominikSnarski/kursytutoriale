/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavLink,
  NavItem,
  Jumbotron,
  Media,
  Badge,
  TabContent,
  TabPane,
  Progress,
  Spinner,
} from 'reactstrap';
import './style.css';
import Zoom from 'react-reveal/Zoom';
import classnames from 'classnames';
import EditProfile from './EditProfile';
import { UserService } from '../../api/Services/UserService';
import CourseService from '../../api/Services/CourseService';
import CourseProgressService from '../../api/Services/CourseProgressService';
import CourseListItem from './CourseListItem';
import { UserContext } from '../../contexts/UserContext';
import { useRouteMatch, Link } from 'react-router-dom';
import Transactions from '../Transactions/Transactions';
import Cards from '../Payment/Cards';
import AppRoutes from '../../routing/AppRoutes';
import UserProfileStatisticPanel from './UserProfileStatisticPanel';

const UserProfile = () => {
  const userContext = React.useContext(UserContext);
  const match = useRouteMatch();
  const userid = match.params.id;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [courseList, setCourseList] = useState([]);
  const [numberOfVisibleCourses, setNumberOfVisibleCourses] = useState(2);
  const [completedCoursesList, setCompletedCoursesList] = useState([]);
  const [uncompletedCoursesList, setUncompletedCoursesList] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [edit, setEdit] = useState(false);
  const [siteLoaded, setSiteLoaded] = useState(false);
  const [activeCoursesTab, setActiveCoursesTab] = useState('1');
  const [emailConfirmed,setEmailConfirmed] = useState(false);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const toggleCourses = (tab) => {
    if (activeCoursesTab !== tab) setActiveCoursesTab(tab);
  };



  const toggleEdit = () => {
    setEdit(!edit);
  };

  // eslint-disable-next-line camelcase
  useEffect(() => {
    if (!siteLoaded) {
      setSiteLoaded(true);
      UserService.getUserProfileById(userid)
        .then((result) => {
          setUser(result.data);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));

        UserService.isEmailConfirmed()
        .then((result) => {
          console.log(result.data);
          setEmailConfirmed(result.data);
        })
        .catch((error) => console.log(error));
 
      CourseService.getUsersCourses(userid)
        .then((result) => setCourseList(result.data))
        .catch((error) => console.log(error));

      CourseProgressService.getUserCompletedCourses(userid)
        .then((result) => setCompletedCoursesList(result.data))
        .catch((error) => console.log(error));

      CourseProgressService.getUserUncompletedCourses(userid)
        .then((result) => setUncompletedCoursesList(result.data))
        .catch((error) => console.log(error));
    }
  });

  const loadMore = () => {
    const numOfCoursesLoading = 10;
    if (numberOfVisibleCourses < courseList.length) {
      setNumberOfVisibleCourses(numberOfVisibleCourses + numOfCoursesLoading);
    }
  };

  if (isLoading) {
    return (
      <center>
        <Spinner />
      </center>
    );
  }
  if (edit) {
    return <EditProfile user={user} onEditEnd={() => setEdit(false)} />;
  }
  return (
    <div>
      <Jumbotron className="jumbotron_bg">
        <Zoom duration="200">
          <Container className="col_bg about">
            <Row>
              <Col xs="3">
                <Container>
                  <Row>
                  {user.avatarPath != null &&(
                    <Media    
                      src={user.avatarPath}
                      style={{ width: '100%', height: '100%' }}
                      alt="Generic placeholder image"
                    />
                    )}
                    {user.avatarPath === null &&(
                    <Media    
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      style={{ width: '100%', height: '100%' }}
                      alt="Generic placeholder image"
                    />
                    )}
                  </Row>
                  <Row className="mb-3">
                    <Col style={{ textAlign: 'center' }}>
                      {user.name ?? user.username}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col style={{ textAlign: 'center' }}>
                      {user.karma} Karma points
                    </Col>
                  </Row>
                  {/*<Row>
                    <Col className="left_side">
                      IT
                      <Progress value={2 * 5}>Newbie</Progress>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="left_side">
                      Kitchen
                      <Progress color="success" value="25">
                        Novice
                      </Progress>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="left_side">
                      DIY
                      <Progress color="info" value={50}>
                        Knows something
                      </Progress>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="left_side">
                      Handcraft
                      <Progress color="warning" value={75}>
                        Master
                      </Progress>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="left_side">
                      Drawing
                      <Progress color="danger" value="100">
                        GrandMaster
                      </Progress>
                    </Col>
                  </Row>*/}
                </Container>
              </Col>
              <Col>
                <Container className="right_side">
                  <Row>
                    <Row className="row-width mb-3">
                      <Col>
                        <l className="name">Author</l>
                      </Col>
                      <Col>
                        {userid == userContext.userid && (
                          <Button
                            color="warning"
                            outline
                            className="float-right"
                            onClick={toggleEdit}
                          >
                            Edit profile
                          </Button>
                        )}
                        {!emailConfirmed && userid == userContext.userid && (
                          <Link to={AppRoutes.ConfirmEmail}>
                            <Button 
                            color="warning"
                            outline color="primary"
                            className="float-right">
                              Confirm email
                            </Button>
                          </Link>
                        )}
                      </Col>
                    </Row>
                  </Row>
                  <Row>
                    <Container>
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
                            <l className="stats">
                              <span role="img" aria-label="silhouethe">
                                👤
                              </span>{' '}
                              About
                            </l>
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
                            <l className="stats">
                              <span role="img" aria-label="contact">
                                🖖
                              </span>{' '}
                              Contact
                            </l>
                          </NavLink>
                        </NavItem>
                        <NavItem className="tabItem">
                          {userid == userContext.userid && (
                            <NavLink
                              className={classnames({
                                active: activeTab === '3',
                              })}
                              onClick={() => {
                                toggle('3');
                              }}
                            >
                              <l className="stats">
                                <span role="img" aria-label="billing">
                                  💳
                                </span>{' '}
                                Billing History
                              </l>
                            </NavLink>
                          )}
                        </NavItem>
                        <NavItem className="tabItem">
                          {userid == userContext.userid && (
                            <NavLink
                              className={classnames({
                                active: activeTab === '4',
                              })}
                              onClick={() => {
                                toggle('4');
                              }}
                            >
                              <l className="stats">
                                <span role="img" aria-label="cards">
                                  💲
                                </span>{' '}
                                User Cards
                              </l>
                            </NavLink>
                          )}
                        </NavItem>
                      
                      </Nav>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" className="about">
                        {console.log(user)}
                          {user.profileDescription ?
                            `${user.profileDescription}`:
                            '✧(>o<)ﾉ✧ Author left no description ✧(>o<)ﾉ✧'
                            }
                        </TabPane>
                        <TabPane tabId="2" className="contact">
                          <a>
                            {user.mail != null
                              ? `User site ${user.siteLink}`
                              : ''}
                          </a>
                        </TabPane>
                        <TabPane tabId="3" className="billing">
                          {userid == userContext.userid && (
                            <Transactions></Transactions>
                          )}
                        </TabPane>

                        <TabPane tabId="4" className="cards">
                        {userid == userContext.userid && (
                          <Cards
                            deleteable={true}
                          />
                        )}

                        </TabPane>
                      </TabContent>
                    </Container>
                  </Row>
                </Container>
              </Col>
            </Row>
            {/*<hr width="100%"></hr>*/}
            <Row style={{ width: '100%' }}>
              <Nav tabs>
                <NavItem className="tabItem">
                  <NavLink
                    className={classnames({
                      active: activeCoursesTab === '1',
                    })}
                    onClick={() => {
                      toggleCourses('1');
                    }}
                  >
                    <l className="stats">
                      <span role="img" aria-label="list">
                        📝
                      </span>{' '}
                      Courses
                    </l>
                  </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                  <NavLink
                    className={classnames({
                      active: activeCoursesTab === '2',
                    })}
                    onClick={() => {
                      toggleCourses('2');
                    }}
                  >
                    <l className="stats">
                      <span role="img" aria-label="list">
                        📝
                      </span>{' '}
                      Observed
                    </l>
                  </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                  <NavLink
                    className={classnames({
                      active: activeCoursesTab === '3',
                    })}
                    onClick={() => {
                      toggleCourses('3');
                    }}
                  >
                    <l className="stats">
                      <span role="img" aria-label="list">
                        📝
                      </span>{' '}
                      Completed
                    </l>
                  </NavLink>
                </NavItem>

                <NavItem className="tabItem">
                <NavLink
                    className={classnames({
                      active: activeCoursesTab === '4',
                    })}
                    onClick={() => {
                      toggleCourses('4');
                    }}
                  >
                    <l className="stats">
                      <span role="img" aria-label="list">
                      📊
                      </span>{' '}
                      Statistics
                    </l>
                  </NavLink>
                        </NavItem>

              </Nav>
            </Row>
            <Row>
              <TabContent
                style={{ width: '100%' }}
                activeTab={activeCoursesTab}
              >
                <TabPane tabId="1">
                  {courseList.length === 0 ? (
                    <p>This User haven't published any courses yet.</p>
                  ) : (
                    <Col>
                      {courseList
                        .slice(0, numberOfVisibleCourses)
                        .map((course, index) => (
                          <Row key={index} sm="auto" p>
                            <CourseListItem course={course} />
                            <Link
                              to={{
                                pathname: AppRoutes.SurveyList,
                              }}
                            >
                              <Button color="warning" className="ml-1">
                                See surveys
                              </Button>
                            </Link>
                          </Row>
                        ))}
                      {!(numberOfVisibleCourses >= courseList.length) && (
                        <Button
                          onClick={() => loadMore()}
                          style={{ marginTop: '5px' }}
                        >
                          See More
                        </Button>
                      )}
                    </Col>
                  )}
                </TabPane>

                <TabPane tabId="2">
                  {uncompletedCoursesList.length === 0 ? (
                    <p>This User has not started observing any courses yet.</p>
                  ) : (
                    <Col>
                      {uncompletedCoursesList.map((course, index) => (
                        <Row key={index} sm="auto" p>
                          <CourseListItem course={course} />
                        </Row>
                      ))}
                    </Col>
                  )}
                </TabPane>

                <TabPane tabId="3">
                  {completedCoursesList.length === 0 ? (
                    <p>This User has not completed any courses yet.</p>
                  ) : (
                    <Col>
                      {completedCoursesList.map((course, index) => (
                        <Row key={index} sm="auto" p>
                          <CourseListItem course={course} />
                        </Row>
                      ))}
                    </Col>
                  )}
                </TabPane>

                <TabPane tabId="4">
                 <UserProfileStatisticPanel/>
                </TabPane>

              </TabContent>
            </Row>
          </Container>
        </Zoom>
      </Jumbotron>
    </div>
  );
};

export default UserProfile;
