import React, { useState, useEffect } from 'react';
import {
  Container,
  ListGroup,
  UncontrolledCollapse,
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  FormGroup,
  Input,
  Spinner,
} from 'reactstrap';
import { CourseService } from '../../api/Services/CourseService';
import Button from '../../layouts/CSS/Button/Button';
import './style.css';

function DiscountGenerator(props) {
  const [discounts, setDiscounts] = useState([]);
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [codesLoaded, setCodesLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [typeField, setTypeField] = useState('Fixed');
  const [amountField, setAmountField] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      CourseService.getDiscounts(props.id).then((response) => {
        setDiscounts(response.data);
      });
      setCodesLoaded(true);
    }
  }, [props.id]);

  const makeid = (owner, course, id, length) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result += id.substring(0, 5);
    result += owner.substring(0, 3);
    result += course.substring(0, 3);
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const generate = () => {
    if (amountField <= 0) {
      setErrorMessage('Value of discount must be greater than 0');
      return;
    }

    setErrorMessage('');

    CourseService.generateDiscounts(props.id, {
      type: typeField,
      code: makeid(props.owner, props.course, props.id, 5),
      amount: parseInt(amountField, 10),
    });
  };

  if (!codesLoaded) {
    return (
      <Row>
        <Col xs="6" sm="4"></Col>
        <Col xs="6" sm="4">
          <Spinner
            className="d-lg-flex d-block h2"
            style={{ width: '3rem', height: '3rem' }}
            color="primary"
          />
        </Col>
        <Col sm="4"></Col>
      </Row>
    );
  }

  return (
    <Container fluid>
      <Button id="toggler" text="Generate discount codes" />
      <UncontrolledCollapse toggler={'#toggler'}>
        <Card fluid outline style={{ borderColor: '#ffb606' }}>
          <CardBody style={{ backgroundColor: '#f5dfae' }}>
            <CardText style={{ color: 'black' }}>
              You can generate codes which will give some discount when joining
              your course!
            </CardText>
            <Container className="mb-3">
              <Row>
                <Col sm={6}>
                  <Input
                    type="number"
                    name="amount"
                    id="exampleText"
                    className="input_field"
                    placeholder="How big discount do you want to give..."
                    onChange={(e) => setAmountField(e.target.value)}
                  />
                </Col>

                <Col sm={3}>
                  <FormGroup>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      className="input_field"
                    >
                      <option onClick={() => setTypeField('Flat')}>Flat</option>
                      <option onClick={() => setTypeField('Percent')}>
                        Percentage
                      </option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <p style={{ color: 'red', marginTop: '-2%' }}>{errorMessage}</p>
              </Row>
              Flat - constant discount value. E.g.: (Total course cost: 20$,
              Discount: 10-Flat, Final price: 10$) <br />
              Percentage - percentage of course price. E.g.: (Total course cost:
              20$, Discount: 10-Percentage, Final price: 18$) <br />
            </Container>

            <Button
              text="Generate"
              onClick={() => {
                generate();
              }}
            />

            <Button
              text="Show codes"
              onClick={() => {
                setShowDiscounts(!showDiscounts);
              }}
            />

            {showDiscounts && (
              <Container>
                {discounts.length <= 0 && 'There are no generated codes.'}
                <ListGroup style={{ borderColor: '#ffb606' }}>
                  {discounts.length > 0 &&
                    discounts.map((item, i) => (
                      <p key={i}>
                        {item.value}: -{item.amount}
                        {item.type === 0 && '$'}
                        {item.type === 1 && '%'}
                      </p>
                    ))}
                </ListGroup>
              </Container>
            )}
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    </Container>
  );
}

export default DiscountGenerator;
