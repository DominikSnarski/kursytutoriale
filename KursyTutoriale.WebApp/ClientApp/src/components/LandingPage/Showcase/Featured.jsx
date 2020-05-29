import React from 'react';
import {
  Card,
  CardText,
  CardTitle,
  Container,
  Col,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Fade } from 'react-reveal';
import AppRoutes from '../../../routing/AppRoutes';

const Featured2 = (props) => (
  <Container className="Container">
    <Fade left duration="200">
      <Row>
        {props.coursesList.map((course, key) => (
          <Col xs="6" sm="4" key={key}>
            <Link to={`${AppRoutes.Courseview}/${course.id}`}>
              <div style={{ cursor: 'pointer', backgroundColor: '#ffb606'}}>
                <Card className="m-2" style={{ backgroundColor: '#ffb606' }}>
                  <CardTitle style={{ color: 'white' }}>
                    {course.title}
                  </CardTitle>
                  <CardText style={{ color: 'black' }} className='mt-2'>
                    {course.description}
                  </CardText>
                </Card>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Fade>
  </Container>
);
export default Featured2;
