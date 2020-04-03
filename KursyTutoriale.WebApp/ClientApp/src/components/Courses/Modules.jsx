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
import { UserContext } from '../../contexts/UserContext';
import LessonsList from './LessonsList';
import './style.css';
import AppRoutes from '../../routing/AppRoutes';

function Modules(props) {
  const userContext = React.useContext(UserContext);

  return (
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
                  courseid={props.courseID}
                  moduleid={item.id}
                  moduleDescription={item.description}
                  moduleTitle={item.title}
                  ownerID={props.ownerID}
                />
              </UncontrolledCollapse>
            </Col>
          </Row>
        ))}

        {userContext.userid === props.ownerID && (
          <Row className="d-flex justify-content-center mb-2">
            <Col>
              <Link
                to={{
                  pathname: AppRoutes.AddModule,
                  state: {
                    courseid: props.courseID,
                  },
                }}
              >
                <Button color="success" size="lg" block>
                  Add new module
                </Button>
              </Link>
            </Col>
          </Row>
        )}
      </ListGroup>
    </Container>
  );
}

export default Modules;
