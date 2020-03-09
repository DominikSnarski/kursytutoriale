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

const LessonsList = (props) => (
  <Container fluid>
    <Card>
      <CardBody>
        {/* module description */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni,
        voluptas debitis similique porro a molestias consequuntur earum odio
        officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.
      </CardBody>

      {props.lessons.map((item, i) => (
        <Row key={i}>
          <Col className="ml-2 mb-2 mr-2">
            <Card
              body
              style={{ backgroundColor: '#7CC3D8', borderColor: '#7CC3D8' }}
            >
              <CardTitle>{item.title}</CardTitle>
              <CardText className="card-height">{item.content}</CardText>
              <Link to="/lessonview">
                <Button fluid onClick={props.toggleLesson}>
                  Let`&apos`s go
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>
      ))}
    </Card>
  </Container>
);

export default LessonsList;
