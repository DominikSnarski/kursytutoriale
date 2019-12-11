import React, { useState } from 'react';
import {
    Input
} from 'reactstrap';
import TargetArea from './TargetArea';
import './style.css';
import { Container } from 'reactstrap';



class WorkingArea2 extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps({ props }) {
        this.setState({ ...this.state, props })
    }

    componentWillReceiveProps(props) {
        const { refresh, list } = this.props;
        if (props.refresh !== refresh) {
            this.props.list = list;
        }
    }

    render() {
        return (
            <Container>
                <TargetArea>
                    {this.props.list.map(item =>
                        <div>
                            {item.type === 'textarea' && <Input type='textarea' />}{' '}
                        </div>)}
                </TargetArea>
            </Container>
        )
    };
}

export default WorkingArea2;
