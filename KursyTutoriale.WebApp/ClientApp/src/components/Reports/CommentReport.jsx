import React, { useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap';

const CommentReportView = () => {
  const [cSelected, setCSelected] = useState([]);

  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  };

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <Alert color="danger" className="text-center">
              Comment Report <br></br>
              <hr />
              Choose why you want to report this comment. <br></br>
              You can choose several options
            </Alert>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button
              outline
              color="danger"
              onClick={() => onCheckboxBtnClick(1)}
              active={cSelected.includes(1)}
            >
              Sexual content
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              outline
              color="danger"
              onClick={() => onCheckboxBtnClick(2)}
              active={cSelected.includes(2)}
            >
              Offensive content
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              outline
              color="danger"
              onClick={() => onCheckboxBtnClick(3)}
              active={cSelected.includes(3)}
            >
              Violence
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col xs="auto">
            <Button
              outline
              color="danger"
              onClick={() => onCheckboxBtnClick(4)}
              active={cSelected.includes(4)}
            >
              Misleading or deceptive
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              outline
              color="danger"
              onClick={() => onCheckboxBtnClick(5)}
              active={cSelected.includes(5)}
            >
              Racism
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              outline
              color="danger"
              onClick={() => onCheckboxBtnClick(6)}
              active={cSelected.includes(6)}
            >
              Spam
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col xs="auto">
            <Button
              outline
              color="danger"
              onClick={() => onCheckboxBtnClick(7)}
              active={cSelected.includes(7)}
            >
              Violence or harmful behavior
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              outline
              color="danger"
              onClick={() => onCheckboxBtnClick(8)}
              active={cSelected.includes(8)}
            >
              Discrimination
            </Button>
          </Col>
        </Row>
        {/* <p>Selected: {JSON.stringify(cSelected)}</p> */}
        <br></br>
        <Row className="justify-content-center text-dark">
          <Col className="text-dark">
            Something else?
            <FormGroup>
              <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center text-dark">
          Learn more about our policies{' '}
          <a href="#" className="alert-link">
            {' '}
            here
          </a>
          .
        </Row>
        <Row className="justify-content-center mt-4">
          <Button color="danger">Report</Button>
        </Row>
      </Form>
    </Container>
  );
};

export default CommentReportView;
