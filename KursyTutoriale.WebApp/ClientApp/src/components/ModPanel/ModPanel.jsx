/* eslint-disable */
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import {
  Nav,
  NavItem,
  NavLink,
  Row,
  Jumbotron,
  Col,
  Spinner,
  Container,
  TabContent,
  TabPane,
  Input,
} from 'reactstrap';
import Button from '../../layouts/CSS/Button/Button';
import Card from '../../layouts/CSS/Card/Card';
import { ModService } from '../../api/Services/ModService';
import CourseViewer from '../Courses/CourseViewer';

const ModPanel = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [coursesAssigned, setCoursesAssigned] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [courseViewItem, setCourseViewItem] = useState({});
  const [courseViewLoaded, setCourseViewLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [reportsAssigned, setReportsAssigned] = useState(false);
  const [reports, setReports] = useState(false);
  const [reportCodes, setReportCodes] = useState(false);
  const [itemSelectedIndex, setItemSelectedIndex] = useState(-1);

  useEffect(() => {
    if (!pageLoaded) {
      setPageLoaded(true);
      ModService.getReportCodes().then((response) => {
        setReportCodes(response.data);
      });
    }
  });

  if (!pageLoaded) {
    return (
      <Spinner
        className="d-lg-flex d-block h2"
        style={{ width: '3rem', height: '3rem' }}
        color="primary"
      />
    );
  }

  const getAssignments = () => {
    ModService.getCoursesRequiringVerification().then((response) => {
      setCoursesAssigned(true);
      setAssignments(response.data);
      console.log(response.data);
      console.log(assignments);
    });
  };

  const getReportAssignments = () => {
    ModService.getReports().then((response) => {
      setReports(response.data);
      console.log(response.data);
      setReportsAssigned(true);
    });
  };

  const setCourseViewer = (i, type) => {
    console.log(type[i]);
    console.log(courseViewItem);
    setCourseViewLoaded(true);
    setItemSelectedIndex(i);
    setCourseViewItem(type[i]);
  };

  const toggleTab = (i) => {
    if (activeTab !== i) {
      setActiveTab(i);
      setCourseViewLoaded(false);
    } else {
    }
  };

  return (
    <Jumbotron>
      <Container>
        <Row>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  toggleTab('1');
                }}
              >
                Verification
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  toggleTab('2');
                }}
              >
                Reports
              </NavLink>
            </NavItem>
          </Nav>
        </Row>
        <Row>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Col xs="4">
                {!coursesAssigned && (
                  <Button
                    onClick={() => {
                      getAssignments();
                    }}
                    text={'Get Assignments'}
                  ></Button>
                )}
                {coursesAssigned && (
                  <div>
                    {assignments.map((c, i) => {
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            setCourseViewer(i, assignments);
                          }}
                        >
                          <Card
                            title={c.title}
                            cardtext={c.description}
                            name="napraw"
                            price={c.price}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </Col>
            </TabPane>
            <TabPane tabId="2">
              <Col xs="4">
                {!reportsAssigned && (
                  <Button
                    onClick={() => {
                      getReportAssignments();
                    }}
                    text={'Get Assignments'}
                  ></Button>
                )}
                {reportsAssigned && (
                  <div>
                    {reports.map((c, i) => {
                      return (
                        <div
                          key={i}
                          onClick={() => setCourseViewer(i, reports)}
                        >
                          <div>Type: {c.reportType}</div>
                          <div>Comment: {c.reporterComment}</div>
                          <div>Reported: {c.reportedDate}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Col>
            </TabPane>
          </TabContent>
          <Col>
            {courseViewLoaded && (
              <div>
                <CourseViewer
                  id={
                    courseViewItem.id !== undefined
                      ? courseViewItem.id
                      : courseViewItem.courseId
                  }
                />
              </div>
            )}
            {courseViewLoaded && activeTab === '1' && (
              <div>
                <Input
                  id="VerifierCommentTextArea"
                  type="textarea"
                  style={{ height: 150 }}
                  placeholder="Reason for rejection"
                />
                <Button
                  text="Verify"
                  onClick={() =>
                    ModService.verifyCourse(courseViewItem.id).then(
                      (response) => {
                        setCourseViewLoaded(false);
                        let index = assignments;
                        index.splice(assignments.indexOf(courseViewItem), 1);
                        setAssignments(index);
                      },
                    )
                  }
                />
                <Button
                  text="Reject"
                  onClick={() => {
                    let comment = document.getElementById(
                      'VerifierCommentTextArea',
                    ).value;
                    ModService.rejectCourse(courseViewItem.id, comment).then(
                      (response) => {
                        setCourseViewLoaded(false);
                        let index = assignments;
                        index.splice(assignments.indexOf(courseViewItem), 1);
                        setAssignments(index);
                      },
                    );
                  }}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default ModPanel;
