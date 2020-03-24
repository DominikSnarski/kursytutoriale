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
import AppRoutes from '../../routing/AppRoutes';

const LessonsList = (props) => (
  <Container fluid>
    <Card>
      <CardBody>
        { props.moduleDescription }
      </CardBody>

      {props.lessons.map((item, i) => (
        <Row key={i}>
          <Col className="ml-2 mb-2 mr-2">
            <Card
              body
              style={{ backgroundColor: '#7CC3D8', borderColor: '#7CC3D8' }}
            >
              <CardTitle>{item.title}</CardTitle>
              <CardText className="card-height">{'temp description'}</CardText>
              <Link
                to={{
                  pathname: AppRoutes.Lesson,
                  state: {
                    title: item.title,
                    content: item.content,
                  },
                }}>
                <Button color="primary">
                  Lets go
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>
      ))}

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
    </Card>
  </Container>
);

export default LessonsList;
