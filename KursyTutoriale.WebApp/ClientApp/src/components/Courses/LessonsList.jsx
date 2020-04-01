import React from 'react';
import {
  Button,
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
                style={{ backgroundColor: '#7CC3D8', borderColor: '#7CC3D8' }}
              >
                <CardTitle>{item.title}</CardTitle>
                <CardText className="card-height">
                  {'temp description'}
                </CardText>
                <Link
                  to={{
                    pathname: AppRoutes.Lesson,
                    state: {
                      lessons: props.lessons,
                      index: i,
                      ownerID: props.ownerID,
                      courseID: props.courseid,
                    },
                  }}
                >
                  <Button color="primary">Lets go</Button>
                </Link>
              </Card>
            </Col>
          </Row>
        ))}

        {userContext.userid === props.ownerID && (
          <Link
            className="m-2"
            to={{
              pathname: AppRoutes.EditLesson,
              state: {
                courseid: props.courseid,
                moduleid: props.moduleid,
              },
            }}
          >
            <Button color="success" size="lg" block>
              Add new lesson
            </Button>
          </Link>
        )}
      </Card>
    </Container>
  );
}
export default LessonsList;
