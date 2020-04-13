import React, { useState, useEffect } from 'react';
// import './Details.css';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Collapse,
  Button,
  Input,
  Col,
  Row,
  Alert,
  Spinner,
} from 'reactstrap';
// import { AdminService } from '../../api/Services/AdminService';
import CourseViewer from '../Courses/CourseViewer';
import { ModService } from '../../api/Services/ModService';
import { CourseService } from '../../api/Services/CourseService';

const UnverifiedCourseDetails = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonVerifyClick = () => {
    ModService.verifyCourse(props.course.id)
      .then(() => history.push('/'))
      .then(() => history.push('/adminMainPanel'));
  };
  const handleButtonRejectClick = () => {
    const comment = document.getElementById('VerifierCommentTextArea').value;
    ModService.rejectCourse(props.course.id, comment)
      .then(() => history.push('/'))
      .then(() => history.push('/adminMainPanel'));
  };

  const [course, setCourse] = useState(props.course);
  const [courseLoaded, setCourseLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      CourseService.getCourse(props.course.id).then((response) => {
        setCourse(response.data);
        setRating(response.data.rating);
        setCourseLoaded(true);
        CourseService.incrementViewCount(props.id);
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
      <tbody>
        <tr onClick={() => toggle()} style={{ cursor: 'pointer' }}>
          <td>{props.course.title}</td>
          <td>{props.course.date}</td>
          <td>{props.course.id}</td>
          <td>{props.course.ownerId}</td>
          <td>{props.course.price}</td>
        </tr>
      </tbody>
      <Collapse isOpen={isOpen}>
        <Container>
          <div>
            <CourseViewer
              course={course}
              rating={rating}
              id={props.course.id}
            />
          </div>
        </Container>
        <td>
          <Button onClick={() => handleButtonVerifyClick()}>Verify</Button>
        </td>
        <td>
          <Button onClick={() => handleButtonRejectClick()}>Reject</Button>
        </td>
        <Input
          id="VerifierCommentTextArea"
          type="textarea"
          style={{ height: 150 }}
          placeholder="Reason for rejection"
        />
      </Collapse>
    </Container>
  );
};

export default UnverifiedCourseDetails;
