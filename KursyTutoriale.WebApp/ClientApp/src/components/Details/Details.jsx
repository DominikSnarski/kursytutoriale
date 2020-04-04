import React, { useState } from 'react';
import './Details.css';
import { Container, Row, Col, Collapse, Media, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import AppRoutes from '../../routing/AppRoutes';

function Details({ course }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const history = useHistory();

  return (
    <tbody>
      <tr onClick={() => toggle()} style={{ cursor: 'pointer' }}>
        <td>
          <Media src="https://jakewilson.gallerycdn.vsassets.io/extensions/jakewilson/vscode-placeholder-images/0.1.0/1499508629226/Microsoft.VisualStudio.Services.Icons.Default" />
        </td>
        <Link to={`${AppRoutes.Courseview}/${course.id}`}>
          <td>{course.title}</td>
        </Link>
        <td>{course.date}</td>
      </tr>
      <Collapse isOpen={isOpen}>
        <Container>
          <Row>
            <Col className="additional">
              Price: {`${course.price}\t`}
              Tags:
              {course.tags.map((txt, key) => (
                <span key={key}> {txt.id}</span>
              ))}
            </Col>
          </Row>

          <Row>
            <Col className="d-flex justify-content-center mb-2">
              {course.description}
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Button
              block
              className="m-2"
              onClick={() => {
                history.push(`/courseview/${course.id}`);
              }}
            >
              Go to course page
            </Button>
          </Row>
        </Container>
      </Collapse>
    </tbody>
  );
}
export default Details;
