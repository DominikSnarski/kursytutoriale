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
                <CardText className="card-height">{item.description}</CardText>
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

                {userContext.userid === props.ownerID &&
                item.title !== 'Default title' && ( // warunek item.title !== 'Default title'trzeba bedzie usunac potem
                    <Link
                      className="m-1"
                      to={{
                        pathname: AppRoutes.EditLesson,
                        state: {
                          courseid: props.courseid,
                          lessonid: item.id,
                          title: item.title,
                          description: item.description,
                          content: JSON.parse(props.lessons[i].content),
                        },
                      }}
                    >
                      <Button className="ml-2" color="secondary">
                        Edit lesson
                      </Button>
                    </Link>
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
                  courseid: props.courseid,
                  moduleid: props.moduleid,
                },
              }}
            >
              <Button color="success" size="lg">
                Add new lesson
              </Button>
            </Link>

            <Link
              className="m-1"
              to={{
                pathname: AppRoutes.EditModule,
                state: {
                  courseid: props.courseid,
                  moduleid: props.moduleid,
                  title: props.moduleTitle,
                  description: props.moduleDescription,
                },
              }}
            >
              <Button color="secondary" size="lg">
                Edit module
              </Button>
            </Link>
          </Row>
        )}
      </Card>
    </Container>
  );
}
export default LessonsList;
