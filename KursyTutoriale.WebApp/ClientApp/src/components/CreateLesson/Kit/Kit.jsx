import React from 'react';
import { Container, Col, Row, Card, CardHeader } from 'reactstrap';
import Button2 from '../../../layouts/CSS/Button/Button';
import '../Kit.css'

function Kit(props) {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <CardHeader className="mb-3 handle" style={{ textAlign: 'center' }}>
              Tools kit
            </CardHeader>
            <Button2
              width='100%'
              text="Add text area"
              onClick={props.addTextField}>
            </Button2>
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
            <Button2
              width="100%"
              onClick={props.clearLesson}
              text='Clear'>
            </Button2>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Kit;
