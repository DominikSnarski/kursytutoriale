/* eslint-disable */
import React from 'react';
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

class UserProfile extends React.Component {
  constructor(props) {
    super();

    this.state = {
      user: null,
      userid: props.match.params.id,
      isLoading: true,
      courseList: [],
      numberOfCourses: 0,
      completedCoursesList: [],
      numberOfCompletedCourses: 0,
      uncompletedCoursesList: [],
      numberOfUncompletedCourses: 0,
      numOfVisibleCourses: 2,

      userName: props.username,
      type: 'Author',
      karma: 421,
      karma_color: 'primary',
      courses_color: 'success',
      activeTab: 1,
      showEdit: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  }

  toggleEdit() {
    this.setState({ showEdit: !this.state.showEdit });
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.toggle('1');
    UserService.getUserProfileById(this.state.userid).then(
      (result) => this.setState({ isLoading: false, user: result.data }),
      (error) => console.log(error),
    );

    CourseService.getUsersCourses(this.state.userid).then(
      (result) =>
        this.setState({ courseList: result, numberOfCourses: result.length }),
      (error) => console.log(error),
    );

    CourseProgressService.getUserCompletedCourses().then(
      (result) =>
        this.setState({
          completedCoursesList: result.data,
          numberOfCompletedCourses: result.data.length,
        }),
      (error) => console.log(error),
    );

    CourseProgressService.getUserUncompletedCourses().then(
      (result) =>
        this.setState({
          uncompletedCoursesList: result.data,
          numberOfUncompletedCourses: result.data.length,
        }),
      (error) => console.log(error),
    );
  }

  loadMore() {
    const numOfCoursesLoading = 10;
    if (this.state.numOfVisibleCourses < this.state.numberOfCourses) {
      this.setState({
        numOfVisibleCourses:
          this.state.numOfVisibleCourses + numOfCoursesLoading,
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <center>
          <Spinner />
        </center>
      );
    }
    return (
      <div>
        {this.state.showEdit && <EditProfile />}
        {!this.state.showEdit && (
          <Jumbotron className="jumbotron_bg">
            <Zoom duration="200">
              <Container className="col_bg about">
                <Row>
                  <Col xs="3">
                    <Container>
                      <Row>
                        <Media
                          src="https://www.w3schools.com/howto/img_avatar.png"
                          style={{ width: '100%', height: '100%' }}
                          alt="Generic placeholder image"
                        />
                        <hr width="100%"></hr>
                      </Row>
                      <Row>
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
                      </Row>
                    </Container>
                  </Col>
                  <Col>
                    <Container className="right_side">
                      <Row>
                        <Row className="row-width mb-3">
                          <Col>
                            <l className="name">{this.state.userName}</l>
                            <p className="text-primary">{this.state.type}</p>
                          </Col>
                          <Col>
                            <Button
                              color="primary"
                              outline
                              className="float-right"
                              onClick={this.toggleEdit}
                            >
                              Edit profile
                            </Button>
                            <Button color="primary" className="float-right">
                              <span role="img" aria-label="text-bubble">
                                💬
                              </span>{' '}
                              Send message
                            </Button>
                            <Button
                              color="primary"
                              className="float-right"
                              active
                            >
                              Follow
                            </Button>
                          </Col>
                        </Row>
                        <Row className="row-width">
                          <Col className="stats" sm="2">
                            <p>Karma</p>
                            <Badge
                              className="badge"
                              color={this.state.karma_color}
                            >
                              {this.state.karma}
                            </Badge>
                          </Col>
                          <Col className="stats">
                            <p>Number of courses</p>
                            <Badge
                              className="badge"
                              color={this.state.courses_color}
                            >
                              {this.state.numberOfCourses}
                            </Badge>
                          </Col>
                        </Row>
                        <hr width="100%"></hr>
                      </Row>
                      <Row>
                        <Container>
                          <Nav tabs>
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: this.state.activeTab === '1',
                                })}
                                onClick={() => {
                                  this.toggle('1');
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

                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: this.state.activeTab === '2',
                                })}
                                onClick={() => {
                                  this.toggle('2');
                                }}
                              >
                                <l className="stats">
                                  <span role="img" aria-label="list">
                                    📝
                                  </span>{' '}
                                  My Courses
                                </l>
                              </NavLink>
                            </NavItem>

                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: this.state.activeTab === '3',
                                })}
                                onClick={() => {
                                  this.toggle('3');
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

                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: this.state.activeTab === '4',
                                })}
                                onClick={() => {
                                  this.toggle('4');
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
                          </Nav>
                          <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1" className="about">
                              <Row className="mb-3">
                                <Col sm="3">Name</Col>
                                <Col>{this.state.user.name}</Col>
                              </Row>
                              <Row className="mb-3">
                                <Col sm="3">Age</Col>
                                <Col>{this.state.user.age}</Col>
                              </Row>
                              <Row className="mb-3">
                                <Col sm="3">E-mail</Col>
                                <Col>E-MAIL</Col>
                              </Row>
                              <Row className="mb-3">
                                <Col sm="3">Site</Col>
                                <Col>{this.state.user.siteLink}</Col>
                              </Row>
                              <Row className="mb-3">
                                <Col sm="3">Birthday</Col>
                                <Col>BIRTHDAY</Col>
                              </Row>
                              <Row className="mb-3">
                                <Col sm="3">Gender</Col>
                                <Col>{this.state.user.genderName}</Col>
                              </Row>
                            </TabPane>

                            <TabPane tabId="2">
                              {this.state.numberOfCourses === 0 ? (
                                <p>
                                  This User haven't published any courses yet.
                                </p>
                              ) : (
                                <Col>
                                  {this.state.courseList
                                    .slice(0, this.state.numOfVisibleCourses)
                                    .map((course, index) => (
                                      <Row sm="auto" p>
                                        <CourseListItem course={course} />
                                      </Row>
                                    ))}
                                  <Button
                                    onClick={() => this.loadMore()}
                                    style={{ marginTop: '5px' }}
                                  >
                                    See More
                                  </Button>
                                </Col>
                              )}
                            </TabPane>

                            <TabPane tabId="3">
                              {this.state.numberOfUncompletedCourses === 0 ? (
                                <p>
                                  This User has not started observing any
                                  courses yet.
                                </p>
                              ) : (
                                <Col>
                                  {this.state.uncompletedCoursesList
                                    .slice(
                                      0,
                                      this.state.numberOfUncompletedCourses,
                                    )
                                    .map((course, index) => (
                                      <Row sm="auto" p>
                                        <CourseListItem course={course} />
                                      </Row>
                                    ))}
                                </Col>
                              )}
                            </TabPane>

                            <TabPane tabId="4">
                              {this.state.numberOfCompletedCourses === 0 ? (
                                <p>
                                  This User has not completed any courses yet.
                                </p>
                              ) : (
                                <Col>
                                  {this.state.completedCoursesList
                                    .slice(
                                      0,
                                      this.state.numberOfCompletedCourses,
                                    )
                                    .map((course, index) => (
                                      <Row sm="auto" p>
                                        <CourseListItem course={course} />
                                      </Row>
                                    ))}
                                </Col>
                              )}
                            </TabPane>
                          </TabContent>
                        </Container>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Zoom>
          </Jumbotron>
        )}
      </div>
    );
  }
}

export default UserProfile;
