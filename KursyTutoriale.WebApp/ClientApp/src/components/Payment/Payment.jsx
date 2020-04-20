import { React } from 'react';
import { useHistory } from 'react-router-dom';
import { PaymentService } from '../../api/Services/PaymentService';

// eslint-disable-next-line
import {
  Form,
  FormGroup,
  Row,
  Col,
  Container
} from 'reactstrap';

import Button from '../../layouts/CSS/Button/Button';
import Input from '../../layouts/CSS/InputField/InputField';

function Payment (props) {

  const history = useHistory();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);

    // courseId, name, surname, cardNumber, expirationDate, cvv
    PaymentService.newPayment(
      props.location.state.courseid,
      formData.get('name'),
      formData.get('surname'),
      formData.get('number1') + formData.get('number2') + formData.get('number3') + formData.get('number4'),
      formData.get('expirationDateMonth') + formData.get('expirationDateYear'),
      formData.get('cvv')
    ).then(() => {
      history.push(`/courseview/${props.location.state.courseid}`)
    });
  };

  return (
    <Container className="Container">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Row>
        </Row>
        <Row className="mt-2">
          <Col>
            <Button text="Select from my cards"/>
          </Col>
        </Row>
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
                    />
                </Col>

                <Col>
                    Surname:
                    <Input
                        type="text"
                        name="surname"
                        id="surname"
                    />
                </Col>
                </Row>          
            </FormGroup>
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
                                    />                            
                                </Col> 
                            </Row>                                                     
                        </Col>
                    </Row>
                </FormGroup>
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
                                />
                            </Col>
                            <Col>
                                <Input 
                                    type="text"
                                    name="expirationDateYear"
                                    id="expirationDateYear"
                                    placeholder="Year"
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
                    />
                </Col>
                </Row>          
            </FormGroup>
          </Col>
        </Row>
        <Row className="mt-2">
            <FormGroup className="mt-2" check>
                                Add to my cards
                                <Col>
                                <Input type="checkbox" />
                                </Col>
            </FormGroup>
        </Row>

        <Row className="mt-5">
          <Col>
            <Button text="Back" onClick={() => {history.push(`/courseview/${props.location.state.courseid}`)}}></Button>
          </Col>
          <Col className="text-right">
            <Button text="Submit">
            </Button>
          </Col>
        </Row>
      </Form>
      <br/>
    </Container>
  );
};

export default Payment;