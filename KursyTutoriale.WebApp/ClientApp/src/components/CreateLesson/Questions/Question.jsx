import React from 'react';
import { Container, Card, CardHeader, CardBody, Button } from 'reactstrap';

const Question = () => (
  <Container>
    <Card fluid outline style={{ borderColor: '#9dd2e2' }}>
      <CardHeader className="spans">{this.props.questionText}</CardHeader>
      <CardBody style={{ backgroundColor: '#7CC3D8' }}>
        {this.props.answers[1]}

        <Button size="sm" id="Popover1">
          Submit
        </Button>
      </CardBody>
    </Card>
  </Container>
);

export default Question;
