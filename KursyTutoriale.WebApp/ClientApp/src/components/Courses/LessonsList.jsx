import React from 'react';
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from 'reactstrap';
import './style.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import AppRoutes from '../../routing/AppRoutes';
import Button from '../../layouts/CSS/Button/Button';

function LessonsList(props) {
  const userContext = React.useContext(UserContext);
  return (
    <Container fluid>
      <Card>
        <CardBody>{props.moduleDescription}</CardBody>

        {props.lessons.map((item, i) => (
          <Row key={i}>
            <Col className="ml-2 mb-2 mr-2">
              <Card
                body
                style={{ backgroundColor: '#f5dfae', borderColor: '#f5dfae' }}
              >
                <CardTitle>{item.title}</CardTitle>
                <CardText className="card-height">{item.description}</CardText>
                {(userContext.userid === props.ownerID ||
                  props.isParticipating) && (
                  <Link
                    to={{
                      pathname: AppRoutes.Lesson,
                      state: {
                        courseTitle: props.courseTitle,
                        lessons: props.lessons,
                        index: i,
                        ownerID: props.ownerID,
                        courseID: props.courseid,
                      },
                    }}
                  >
                    <Button text="Go to lesson" color="green" />
                  </Link>
                )}

                {userContext.userid === props.ownerID && (
                  <Link
                    to={{
                      pathname: AppRoutes.EditLesson,
                      state: {
                        courseTitle: props.courseTitle,
                        lessons: props.lessons,
                        index: i,
                        ownerID: props.ownerID,
                        courseID: props.courseid,
                      },
                    }}
                  >
                    <Button text="Edit lesson" color="grey" hover="black" />
                  </Link>
                )}

                {userContext.userid === props.ownerID && (
                  <Link
                    to={{
                      pathname: AppRoutes.AssignmentsList,
                    }}
                  >
                    <Button text="Check assignments" hover="black" />
                  </Link>
                )}

                {userContext.userid === props.ownerID && (
                  <Button text="Add lesson to preview" hover="black" />
                )}
              </Card>
            </Col>
          </Row>
        ))}

        {userContext.userid === props.ownerID && (
          <Row className="justify-content-md-center">
            <Link
              className="m-1"
              to={{
                pathname: AppRoutes.CreateLesson,
                state: {
                  courseTitle: props.courseTitle,
                  courseid: props.courseid,
                  moduleid: props.moduleid,
                  lessonNumber: props.lessons.length,
                },
              }}
            >
              <Button size="lg" text="Add new lesson" />
            </Link>

            <Link
              className="m-1"
              to={{
                pathname: AppRoutes.EditModule,
                state: {
                  courseid: props.courseid,
                  moduleid: props.moduleid,
                  description: props.moduleDescription,
                  isEdited: false,
                },
              }}
            >
              <Button size="lg" text="Edit module" />
            </Link>
          </Row>
        )}
      </Card>
    </Container>
  );
}
export default LessonsList;
