import React, { useState } from 'react';
// import './Details.css';
// import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Collapse, Button } from 'reactstrap';
// import { AdminService } from '../../api/Services/AdminService';

    const UnverifiedCourseDetails = (props) => {
    //  const history = useHistory();
      const [isOpen, setIsOpen] = useState(false);

      const toggle = () =>{
          setIsOpen(!isOpen);
      };

    

return (
      <tbody>
        <tr onClick={() => toggle()} style={{ cursor: 'pointer' }}>
          <td>{props.course.title}</td>
          <td>{props.course.date}</td>
        </tr>
        <Collapse isOpen={isOpen}>
          <Container>

            <Row>
              <Col className="d-flex justify-content-center mb-2">OwnerId: {props.course.ownerId}</Col>
            </Row>

            <Row>
              <Col className="d-flex justify-content-center mb-2">
                Id: {props.course.id}
              </Col>
            </Row>
            
            <Row>
              <Col className="d-flex justify-content-center mb-2">
                Price: {props.course.price}
              </Col>
            </Row>

            <Row>
              <Col className="d-flex justify-content-center mb-2">
                Description: {props.course.description}
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center mb-2">
                <Button >Verifiy</Button>
              </Col>
            </Row>
          </Container>
        </Collapse>
      </tbody>
);
};

export default UnverifiedCourseDetails;
