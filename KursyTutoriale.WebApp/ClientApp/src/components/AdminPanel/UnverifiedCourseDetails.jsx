import React, { useState } from 'react';
// import './Details.css';
 import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Collapse, Button, Table, Input } from 'reactstrap';
// import { AdminService } from '../../api/Services/AdminService';
import CourseViewer from '../Courses/CourseViewer';
import { ModService } from '../../api/Services/ModService';

    const UnverifiedCourseDetails = (props) => {
      const history = useHistory();
      const [isOpen, setIsOpen] = useState(false);

      const toggle = () =>{
          setIsOpen(!isOpen);
      };

      const handleButtonVerifyClick = () => {
        ModService.verifyCourse(props.course.id).then(() => history.push('/')).then(() => history.push('/adminMainPanel'));
      };
      const handleButtonRejectClick = () => {
        const comment = document.getElementById(
          'VerifierCommentTextArea',
        ).value;
        ModService.rejectCourse(props.course.id,comment).then(() => history.push('/')).then(() => history.push('/adminMainPanel'));
      };

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
                id={props.course.id
                }
              />
              </div>
          </Container>
        <td><Button onClick={() => handleButtonVerifyClick()}>Verify</Button></td>
        <td><Button onClick={() => handleButtonRejectClick()}>Reject</Button></td>
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
