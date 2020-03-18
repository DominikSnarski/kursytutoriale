import React, { useState } from 'react';
// import './Details.css';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Collapse, Media, Button } from 'reactstrap';
import { AdminService } from '../../api/Services/AdminService';

    const ModeratorDetails = (props) => {
      const history = useHistory();
      const [isOpen, setIsOpen] = useState(false);

      const toggle = () =>{
          setIsOpen(!isOpen);
      };

      const handleButtonRemoveClick = () => {
        AdminService.removeModerator(props.user.id).then(() => history.push('/adminMainPanel'));
      };
    

return (
      <tbody>
        <tr onClick={() => toggle()} style={{ cursor: 'pointer' }}>
          <td>
            <Media src="https://jakewilson.gallerycdn.vsassets.io/extensions/jakewilson/vscode-placeholder-images/0.1.0/1499508629226/Microsoft.VisualStudio.Services.Icons.Default" />
          </td>

          <td>{props.user.userName}</td>
          <td>Data utworzenia konta ktorej na razie nie zapisujemy</td>
        </tr>
        <Collapse isOpen={isOpen}>
          <Container>
            <Row>
              <Col className="additional">Email: {props.user.email}</Col>
            </Row>

            <Row>
              <Col className="d-flex justify-content-center mb-2">
                Id: {props.user.id}
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center mb-2">
                <Button onClick={() => handleButtonRemoveClick()}>Remove moderator</Button>
              </Col>
            </Row>
          </Container>
        </Collapse>
      </tbody>
);
};

export default ModeratorDetails;
