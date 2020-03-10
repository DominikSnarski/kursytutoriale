import React from 'react';
import {
  CustomInput,
  Form,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';

const Filters = (props) => (
  <Container>
    <Form innerRef={props.formRef}>
      <Row>
        <Col>
          <FormGroup>
            <Label className="font-weight-bold">Price</Label>
            <div>
              <CustomInput type="checkbox" id="priceFree" label="Free" />
              <CustomInput
                type="checkbox"
                id="priceLessThan10"
                label="Less than 10$"
              />
              <CustomInput
                type="checkbox"
                id="priceFrom10To50"
                label="10-50$"
              />
              <CustomInput
                type="checkbox"
                id="priceFrom50To100"
                label="50-100$"
              />
              <CustomInput
                type="checkbox"
                id="priceMoreThan100"
                label="More than 100$"
              />
            </div>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className="font-weight-bold">Categories</Label>
            <div>
              <CustomInput type="checkbox" id="categoriesCat1" label="Cat1" />
              <CustomInput type="checkbox" id="categoriesCat2" label="Cat2" />
              <CustomInput type="checkbox" id="categoriesCat3" label="Cat3" />
              <CustomInput type="checkbox" id="categoriesCat4" label="Cat4" />
              <CustomInput type="checkbox" id="categoriesCat5" label="Cat5" />
            </div>
          </FormGroup>
        </Col>
      </Row>
    </Form>
    <Row>
      <Button onClick={props.formReset} size="xm">
        Clear
      </Button>
    </Row>
  </Container>
);

export default Filters;
