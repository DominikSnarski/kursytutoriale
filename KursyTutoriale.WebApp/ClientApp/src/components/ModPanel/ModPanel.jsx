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
  Label,
  Form,
  FormGroup,
} from 'reactstrap';
import Button from '../../layouts/CSS/Button/Button';
import Card from '../../layouts/CSS/Card/Card';
import { ModService } from '../../api/Services/ModService';
import { CourseService } from '../../api/Services/CourseService';
import { ReportService } from '../../api/Services/ReportService';
import CourseViewerProtected from '../Courses/CourseViewerProtected';

const ModPanel = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [coursesAssigned, setCoursesAssigned] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [courseViewItem, setCourseViewItem] = useState({});
  const [courseViewLoaded, setCourseViewLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [reportsAssigned, setReportsAssigned] = useState(false);
  const [reports, setReports] = useState(false);
  const [reportStatusCodes, setReportStatusCodes] = useState([]);
  const [reportTypeCodes, setReportTypeCodes] = useState([]);
  const [reportAssignments, setReportAssignments] = useState([]);
  const [itemSelectedIndex, setItemSelectedIndex] = useState(-1);
  const [selectedResolveReportCode, setSelectedReportResolveCode] = useState(1);
  let reportTypeText;
  if (courseViewLoaded && activeTab === '2') {
    reportTypeCodes.forEach((code) => {
      if (code.code === reports[itemSelectedIndex].reportType)
        reportTypeText = code.value;
    });
  }

  useEffect(() => {
    if (!pageLoaded) {
      setPageLoaded(true);
      ModService.getReportCodes().then((response) => {
        setReportStatusCodes(response.data);
      });
      ReportService.getReportTypeCodes().then((response) => {
        setReportTypeCodes(response.data);
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
      let assignmentstmp = [];
      if (response.data.length > 0)
        CourseService.getCourse(response.data[0].id).then((c1Response) => {
          assignmentstmp = [...assignmentstmp, c1Response.data];
          if (response.data.length > 1)
            CourseService.getCourse(response.data[1].id).then((c2Response) => {
              assignmentstmp = [...assignmentstmp, c2Response.data];
              if (response.data.length > 2)
                CourseService.getCourse(response.data[2].id).then(
                  (c3Response) => {
                    assignmentstmp = [...assignmentstmp, c3Response.data];
                    setAssignments(assignmentstmp);
                    setCoursesAssigned(true);
                  },
                );
              else {
                setAssignments(assignmentstmp);
                setCoursesAssigned(true);
              }
            });
          else {
            setAssignments(assignmentstmp);
            setCoursesAssigned(true);
          }
        });
      else {
        setAssignments(assignmentstmp);
        setCoursesAssigned(true);
      }
    });
  };

  const getReportAssignments = () => {
    ModService.getReports().then((response) => {
      let assignmentstmp = [];
      setReports(response.data);
      if (response.data.length > 0)
        CourseService.getCourse(response.data[0].courseId).then(
          (c1Response) => {
            assignmentstmp = [...assignmentstmp, c1Response.data];
            if (response.data.length > 1)
              CourseService.getCourse(response.data[1].courseId).then(
                (c2Response) => {
                  assignmentstmp = [...assignmentstmp, c2Response.data];
                  if (response.data.length > 2)
                    CourseService.getCourse(response.data[2].courseId).then(
                      (c3Response) => {
                        assignmentstmp = [...assignmentstmp, c3Response.data];
                        setReportAssignments(assignmentstmp);
                        setReportsAssigned(true);
                      },
                    );
                  else {
                    setReportAssignments(assignmentstmp);
                    setReportsAssigned(true);
                  }
                },
              );
            else {
              setReportAssignments(assignmentstmp);
              setReportsAssigned(true);
            }
          },
        );
      else {
        setReportAssignments(assignmentstmp);
        setReportsAssigned(true);
      }
    });
  };

  const setCourseViewer = (i, type) => {
    setItemSelectedIndex(i);
    setCourseViewItem(type[i]);
    setCourseViewLoaded(true);
  };

  const toggleTab = (i) => {
    if (activeTab !== i) {
      setActiveTab(i);
      setCourseViewLoaded(false);
    }
  };

  const reportResolveSelectChanged = (e) => {
    setSelectedReportResolveCode(
      parseInt(e.target.options[e.target.selectedIndex].value, 10),
    );
  };

  const handleReportResolve = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    ModService.resolveReport(
      reports[itemSelectedIndex].id,
      selectedResolveReportCode,
      formData.get('comment'),
    ).then(() => {
      setCourseViewLoaded(false);
      const index = reportAssignments;
      index.splice(reportAssignments.indexOf(courseViewItem), 1);
      setReportAssignments([...index]);
    });
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
                          onClick={() => {
                            setCourseViewer(i, reportAssignments);
                          }}
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
            {courseViewLoaded && activeTab === '2' && (
              <div>
                <header style={{ fontSize: '30px' }}>Report</header>
                <Label>Reporter: {reports[itemSelectedIndex].reporterId}</Label>
                <div />
                <Label>
                  {reportTypeText}
                  {'  /  '}
                  {reports[itemSelectedIndex].reporterComment}
                </Label>
                <div />
                <Label>
                  Reported on {reports[itemSelectedIndex].reportedDate}
                </Label>
              </div>
            )}
            {courseViewLoaded && (
              <div>
                <CourseViewerProtected
                  course={courseViewItem}
                  rating={courseViewItem.rating}
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
                    ModService.verifyCourse(courseViewItem.id).then(() => {
                      setCourseViewLoaded(false);
                      const index = assignments;
                      index.splice(assignments.indexOf(courseViewItem), 1);
                      setAssignments([...index]);
                    })
                  }
                />
                <Button
                  text="Reject"
                  onClick={() => {
                    const comment = document.getElementById(
                      'VerifierCommentTextArea',
                    ).value;
                    ModService.rejectCourse(courseViewItem.id, comment).then(
                      () => {
                        setCourseViewLoaded(false);
                        const index = assignments;
                        index.splice(assignments.indexOf(courseViewItem), 1);
                        setAssignments([...index]);
                      },
                    );
                  }}
                />
              </div>
            )}
            {courseViewLoaded && activeTab === '2' && (
              <div>
                <Form onSubmit={handleReportResolve}>
                  <FormGroup>
                    <Input
                      type="select"
                      onChange={reportResolveSelectChanged}
                      name="typeSelect"
                    >
                      {reportStatusCodes.map((code, key) => {
                        return (
                          <option key={key} value={code.code}>
                            {code.value}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Input type="textarea" name="comment" />
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" color="success" text="Resolve" />
                  </FormGroup>
                </Form>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default ModPanel;
