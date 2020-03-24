import React from 'react';
import {
  Button,
  Col,
  Container,
  ListGroup,
  Row,
  UncontrolledCollapse,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import LessonsList from './LessonsList';
import './style.css';
import AppRoutes from '../../routing/AppRoutes';


function Modules (props){
  return(
  <Container fluid>
    <ListGroup style={{ borderColor: '#9dd2e2' }}>
      {props.modules.map((item, i) => (
        <Row key={i} className="d-flex justify-content-center mb-2">
          <Col>
            <Button color="info" id={`toggler${item.index}`} size="lg" block>
              {item.title}
            </Button>
            <UncontrolledCollapse toggler={`#toggler${item.index}`}>
              <LessonsList
                toggleLesson={props.toggleLesson}
                lessons={item.lessons}
                courseid = {props.courseid}
                moduleid = {item.id}
              />
            </UncontrolledCollapse>
          </Col>
        </Row>
      ))}

      <Row className="d-flex justify-content-center mb-2">
          <Col>
          <Link to={{
            pathname: AppRoutes.AddModule, 
            state: {
              courseid: props.courseid,
              moduleid: "czej"
            }
            }}>
            <Button color="success" size="lg" block>
              Add new module
            </Button>
          </Link>
          </Col>
        </Row>

    </ListGroup>
  </Container>
);
          }

export default Modules;
