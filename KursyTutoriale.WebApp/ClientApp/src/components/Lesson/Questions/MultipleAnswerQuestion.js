import React, {useState} from 'react';
import {
    FormGroup, Label, Input, Col, Row, Card, CardHeader, CardBody,
    Button, UncontrolledPopover, Popover, PopoverHeader, PopoverBody
} from 'reactstrap';


const Question = (props) => {

    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);

    return (
        <Row className="d-flex justify-content-center mb-2 mt-3" fluid>
            <Card fluid outline style={{ borderColor: '#9dd2e2' }}>
                <CardHeader className="spans">{props.questionText}</CardHeader>
                <CardBody style={{ backgroundColor: '#7CC3D8' }}>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name={props.questionText} />{' '}
                            {props.correctAnswer}
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name={props.questionText} />{' '}
                            {props.wrongAnswer}
                        </Label>
                    </FormGroup>

                    <Button size="sm" id="Popover1" type="button" >Submit</Button>
                    <UncontrolledPopover trigger="legacy" placement="right" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                        <PopoverBody>Correct</PopoverBody>
                    </UncontrolledPopover>
                </CardBody>
            </Card>
        </Row>
    );
}

export default Question;
