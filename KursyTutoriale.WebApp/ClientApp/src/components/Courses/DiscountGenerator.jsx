import React, { useState } from 'react';
import {
  Container,
  ListGroup,
  UncontrolledCollapse,
  Card,
  CardBody,
  CardText,
} from 'reactstrap';
import Button from '../../layouts/CSS/Button/Button';
import InputField from '../../layouts/CSS/InputField/InputField';
import './style.css';

function DiscountGenerator() {
  const [discounts] = useState([
    'elo',
    'witam',
    'dzien dobry',
    'eluwina',
  ]);
  const [showDiscounts, setShowDiscounts] = useState(false);

  return (
    <Container fluid>
      <Button id="toggler" text="Generate discount codes" />
      <UncontrolledCollapse toggler={'#toggler'}>
        <Card fluid outline style={{ borderColor: '#ffb606' }}>
          <CardBody style={{ backgroundColor: '#f5dfae' }}>
            <CardText style={{ color: 'black' }}>
              You can generate codes which will give 10% discount when joining
              your course! Remember to write those codes down! Once you leave
              this page they will be gone!
            </CardText>
            <InputField
              type="number"
              name="amount"
              id="exampleText"
              placeholder="How many codes should we generate?"
            />
            <Button
              text="generate"
              onClick={() => {
                setShowDiscounts(true);
              }}
            />
            {showDiscounts && (
              <ListGroup style={{ borderColor: '#ffb606' }}>
                {discounts.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </ListGroup>
            )}
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    </Container>
  );
}

export default DiscountGenerator;
