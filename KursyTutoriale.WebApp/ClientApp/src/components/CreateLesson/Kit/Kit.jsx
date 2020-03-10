import React from 'react';
import { Container, Col, Row, Card, CardHeader, Button } from 'reactstrap';

function Kit(props) {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <CardHeader className="mb-3" style={{ textAlign: 'center' }}>
              Tools kit
            </CardHeader>
            <Button
              className="mb-3 ml-2 mr-2"
              color="success"
              onClick={props.addTextField}
            >
              Add text area
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
              color="danger"
              onClick={props.clearLesson}
            >
              Clear
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Kit;
