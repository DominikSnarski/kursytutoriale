import React from 'react';
import { Container, Col, Row, Card, CardHeader} from 'reactstrap';

import Button from '../../../layouts/CSS/Button/Button';


function Kit(props) {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <CardHeader className="mb-3" style={{ textAlign: 'center' }}>
              Tool kit
            </CardHeader>
            <Button
              className="mb-3 ml-2 mr-2"
              text="Add text area"
              width="auto"
              onClick={props.addTextField}
            >
            </Button>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Add image
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  onChange={props.addImage}
                  aria-describedby="inputGroupFileAddon01"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
            <Button
              className="mb-3 ml-2 mr-2"
              text="Clear"
              width="auto"
              height="50px"
              onClick={props.clearLesson}
            >
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Kit;
