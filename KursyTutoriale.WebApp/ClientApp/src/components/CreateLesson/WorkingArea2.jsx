/* eslint-disable camelcase */
import React from 'react';
import { Input, Container } from 'reactstrap';
import TargetArea from './TargetArea';
import './style.css';

class WorkingArea2 extends React.Component {
  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ ...this.state, props });
    const { refresh, list } = this.props;
    if (props.refresh !== refresh) {
      this.props.list = list;
    }
  }

  render() {
    return (
      <Container>
        <TargetArea>
          {this.props.list.map((item, i) => (
            <div key={i}>
              {item.type === 'textarea' && <Input type="textarea" />}{' '}
            </div>
          ))}
        </TargetArea>
      </Container>
    );
  }
}

export default WorkingArea2;
