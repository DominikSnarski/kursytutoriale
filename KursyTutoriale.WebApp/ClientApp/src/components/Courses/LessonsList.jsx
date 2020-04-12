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
  const parseContents = (contents) => {
    const content = JSON.parse(contents);
    content.forEach((e) => {
      e.Content = JSON.parse(e.Content);
    });
    return content;
  };
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
                  <Button text="Lets go" color="lightgreen"/>
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
                          content: parseContents(props.lessons[i].content),
                          isEdited: true,
                        },
                      }}
                    >
                      <Button text="Edit lesson" color="grey" hover="black"/>
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
              <Button size="lg" text="Add new lesson"/>
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
              <Button size="lg" text="Edit module"/>
            </Link>
          </Row>
        )}
      </Card>
    </Container>
  );
}
export default LessonsList;
