import React, { useState } from 'react';
import {
    FormGroup, Label, Input, Container, Form, Card, CardHeader, CardBody,
    Button, UncontrolledPopover, Popover, PopoverHeader, PopoverBody
} from 'reactstrap';


class Question extends React.Component {

    constructor() {
        super();

    }

    

    render() {
        return (
            <Container>
                <Card fluid outline style={{ borderColor: '#9dd2e2' }}>
                    <CardHeader className="spans">{this.props.questionText}</CardHeader>
                    <CardBody style={{ backgroundColor: '#7CC3D8' }}>

                        {this.props.answers[1]}

                        <Button size="sm" id="Popover1" >Submit</Button>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}

export default Question;
