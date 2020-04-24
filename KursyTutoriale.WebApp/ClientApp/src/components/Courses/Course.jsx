import { Col, Row, Alert, Spinner, Button, Container } from 'reactstrap';
import { useRouteMatch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import CourseViewer from './CourseViewer';
import './style.css';
import { CourseService } from '../../api/Services/CourseService';
import { UserContext } from '../../contexts/UserContext';
import { ReportService } from '../../api/Services/ReportService';
import CourseReportModal from './CourseReportModal';
import { ParticipantService } from '../../api/Services/ParticipantService';
// import { CommentService } from '../../api/Services/CommentService';

const Course = (props) => {
  const userContext = React.useContext(UserContext);
  const match = useRouteMatch();
  const [course, setCourse] = useState(props.course);
  const [courseLoaded, setCourseLoaded] = useState(false);
  const [comments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState(false);
  const [rating, setRating] = useState(0);
  const [modal, setModal] = useState(false);
  const [isParticipating, setParticipation] = useState(false);

  const report = (comment, type) => {
    ReportService.reportCourse(course.id, comment, type);
  };
  const toggleReportModal = () => setModal(!modal);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      CourseService.getCourse(match.params.id).then((response) => {
        setCourse(response.data);
        setRating(response.data.rating);
        setCourseLoaded(true);
        
        CourseService.incrementViewCount(match.params.id);
        if (
          userContext.userid === response.data.ownerId ||
          userContext.userRoles.includes('Admin')
        ) {
          setParticipation(true);
        } else {
          ParticipantService.isParticipating(response.data.id).then(
            (_response) => {
              setParticipation(_response.data);
            },
          );
        }
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
    <Container>
      {userContext !== undefined &&
        userContext.authenticated &&
        userContext.userid !== course.ownerId && (
          <Button
            color="danger"
            style={{ float: 'right' }}
            onClick={toggleReportModal}
          >
            Report
          </Button>
        )}
      <CourseReportModal
        toggle={toggleReportModal}
        isOpen={modal}
        onSend={report}
      />
      <CourseViewer
        isParticipating={isParticipating}
        course={course}
        rating={rating}
        id={match.params.id}
        comments={comments}
        {...props}
      />
    </Container>
  );
};
export default Course;
