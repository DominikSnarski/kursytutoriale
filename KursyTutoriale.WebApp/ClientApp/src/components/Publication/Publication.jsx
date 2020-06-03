import React, { useState } from 'react';
import { FormGroup, Label, Input, Container } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import Button from '../../layouts/CSS/Button/Button';

const Publication = (props) => {
  const [checked, setChecked] = useState(0);
  const [date, setDate] = useState(new Date());

  const publish = () => {
    if (checked === 0) props.onPublish();
    else if (checked === 1) props.onPublishDate(date);
  };

  const checkedChanged = () => {
    setChecked(0);
  };
  const checkedChanged1 = () => {
    setChecked(1);
  };
  const checkedChanged2 = () => {
    setChecked(2);
  };
  const dateChanged = (e) => {
    setDate(e);
  };
  return (
    <Container>
      <FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" onChange={checkedChanged} />{' '}
            Publish it
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" onChange={checkedChanged1} />
            Publish it on date
          </Label>
        </FormGroup>
        {checked === 1 && (
          <DateTimePicker
            onChange={(value) => dateChanged(value)}
            value={date}
            format="dd-MM-y h:mm:ss a"
            minDate={new Date()}
          />
        )}
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" onChange={checkedChanged2} />
            {"Don't publish it"}
          </Label>
        </FormGroup>
        <Button onClick={() => publish()} text="Publish" />
      </FormGroup>
    </Container>
  );
};
export default Publication;
