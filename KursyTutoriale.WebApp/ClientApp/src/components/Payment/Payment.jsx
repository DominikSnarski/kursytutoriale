import React, { useState } from 'react';
// import { React, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { PaymentService } from '../../api/Services/PaymentService';

// eslint-disable-next-line
import {
  Form,
  FormGroup,
  Row,
  Col,
  Container,
  TabContent,
  TabPane,
} from 'reactstrap';

import Button from '../../layouts/CSS/Button/Button';
import Input from '../../layouts/CSS/InputField/InputField';
import Cards from '../Payment/Cards';

function Payment() {
  const history = useHistory();
  const { courseId } = useParams();

  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [surnameErrorMessage, setSurnameErrorMessage] = useState('');
  const [cardNumberErrorMessage, setCardNumberErrorMessage] = useState('');
  const [expirationDateErrorMessage, setExpirationDateErrorMessage] = useState(
    '',
  );
  const [cvvErrorMessage, setCvvErrorMessage] = useState('');
  const [addToList, setAddToList] = useState(false);

  const [select, setSelect] = useState(false);

  const handleTextChange = () => {
    setNameErrorMessage('');
    setSurnameErrorMessage('');
    setCardNumberErrorMessage('');
    setExpirationDateErrorMessage('');
    setCvvErrorMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    if (formData.get('name') === '') {
      setNameErrorMessage("Name can't be empty. ");
    }

    if (formData.get('surname') === '') {
      setSurnameErrorMessage("Surname can't be empty. ");
    }

    if (
      formData.get('numer1') === '' ||
      formData.get('numer2') === '' ||
      formData.get('numer3') === '' ||
      formData.get('numer4') === ''
    ) {
      setCardNumberErrorMessage(
        'None of the card number fields cannot be empty. ',
      );
    }

    if (
      formData.get('numer1') !== null &&
      formData.get('numer2') !== null &&
      formData.get('numer3') !== null &&
      formData.get('numer4') !== null
    ) {
      if (
        formData.get('numer1').ToString().length !== 4 ||
        formData.get('numer2').ToString().length !== 4 ||
        formData.get('numer3').ToString().length !== 4 ||
        formData.get('numer4').ToString().length !== 4
      )
        setCardNumberErrorMessage(
          'All parts of card number must contains 4 numbers. ',
        );
    }

    if (
      formData.get('expirationDateMonth') === '' ||
      formData.get('expirationDateYear') === ''
    ) {
      setSurnameErrorMessage("Expiration date isn't complete. ");
    }

    if (formData.get('cvv').length !== 3) {
      setSurnameErrorMessage('CVV must contains 3 numbers. ');
    }

    if (
      formData.get('name') === '' ||
      formData.get('surname') === '' ||
      formData.get('numer1') === '' ||
      formData.get('numer2') === '' ||
      formData.get('numer3') === '' ||
      formData.get('numer4') === '' ||
      formData.get('expirationDateMonth') === '' ||
      formData.get('expirationDateYear') === '' ||
      formData.get('cvv') === ''
    ) {
      return;
    }

    const cardNumber =
      formData.get('number1').toString() +
      formData.get('number2').toString() +
      formData.get('number3').toString() +
      formData.get('number4').toString();

    PaymentService.newPayment(
      courseId,
      formData.get('name'),
      formData.get('surname'),
      cardNumber,
      formData.get('expirationDateMonth'),
      formData.get('expirationDateYear'),
      formData.get('cvv'),
      addToList,
    ).then(() => {
      history.push(`/courseview/${courseId}`);
    });
  };

  return (
    <Container className="Container">
      <div>
        <Row className="mt-2">
          <Col>
            <Button
              text="Select from my cards"
              onClick={() => setSelect(!select)}
            />
            {select === true && (
              <TabContent>
                <TabPane>
                  <Cards deleteable={false} courseId={courseId} />

                  <FormGroup className="mt-2">
                    <Row className="mt-2">
                      <Col>
                        Select option:
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          className="input_field"
                          onChange={handleTextChange}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </TabPane>
              </TabContent>
            )}
          </Col>
        </Row>
      </div>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <Row></Row>

        <Row className="mt-2">
          <Col>
            <FormGroup className="mt-2">
              <Row className="mt-2">
                <Col>
                  Name:
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    className="input_field"
                    onChange={handleTextChange}
                  />
                </Col>

                <Col>
                  Surname:
                  <Input
                    type="text"
                    name="surname"
                    id="surname"
                    className="input_field"
                    onChange={handleTextChange}
                  />
                </Col>
              </Row>
            </FormGroup>
            <span className="errorMessage">{nameErrorMessage}</span>
            <span className="errorMessage">{surnameErrorMessage}</span>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <FormGroup className="mt-2">
              <Row>
                <Col>
                  Card number:
                  <Row>
                    <Col>
                      <Input
                        name="number1"
                        id="number1"
                        type="number"
                        placeholder="_ _ _ _"
                        min={0}
                        max={9999}
                        step="1"
                        className="input_field"
                        onChange={handleTextChange}
                      />
                    </Col>
                    <Col>
                      <Input
                        name="number2"
                        id="number2"
                        type="number"
                        placeholder="_ _ _ _"
                        min={0}
                        max={9999}
                        step="1"
                        className="input_field"
                        onChange={handleTextChange}
                      />
                    </Col>
                    <Col>
                      <Input
                        name="number3"
                        id="number3"
                        type="number"
                        placeholder="_ _ _ _"
                        min={0}
                        max={9999}
                        step="1"
                        className="input_field"
                        onChange={handleTextChange}
                      />
                    </Col>
                    <Col>
                      <Input
                        name="number4"
                        id="number4"
                        type="number"
                        placeholder="_ _ _ _"
                        min={0}
                        max={9999}
                        step="1"
                        className="input_field"
                        onChange={handleTextChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </FormGroup>
            <span className="errorMessage">{cardNumberErrorMessage}</span>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <FormGroup className="mt-2">
              <Row className="mt-2">
                <Col>
                  Expiration date:
                  <Row>
                    <Col>
                      <Input
                        type="text"
                        name="expirationDateMonth"
                        id="expirationDateMonth"
                        placeholder="Month"
                        className="input_field"
                        onChange={handleTextChange}
                      />
                    </Col>
                    <Col>
                      <Input
                        type="text"
                        name="expirationDateYear"
                        id="expirationDateYear"
                        placeholder="Year"
                        className="input_field"
                        onChange={handleTextChange}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col>
                  CVV:
                  <Input
                    type="text"
                    name="cvv"
                    id="cvv"
                    placeholder="This number is on the back of the card"
                    className="input_field"
                    onChange={handleTextChange}
                  />
                </Col>
              </Row>
            </FormGroup>
            <span className="errorMessage">{expirationDateErrorMessage}</span>
            <span className="errorMessage">{cvvErrorMessage}</span>
          </Col>
        </Row>
        <Row className="mt-2">
          <FormGroup className="mt-2" check>
            Add to my cards
            <Col>
              <input
                type="checkbox"
                value={addToList}
                onClick={() => setAddToList(!addToList)}
              />
            </Col>
          </FormGroup>
        </Row>

        <Row className="mt-5">
          <Col>
            <Button
              text="Back"
              onClick={() => {
                history.push(`/courseview/${courseId}`);
              }}
            ></Button>
          </Col>
          <Col className="text-right">
            <Button text="Submit"></Button>
          </Col>
        </Row>
      </Form>
      <br />
    </Container>
  );
}

export default Payment;
