import React, { useState } from 'react';
import "./style.css"
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Media } from 'reactstrap';

class Details extends React.Component {
    constructor(props) {
      super(props);
    }
  
    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }
  
    render() {
        return (
            <Modal isOpen={this.props.isOpen} 
            toggle={this.props.toggle} 
            className="_modal" 
            size="lg"
            cssModule={{'modal-title': 'w-100 text-center'}}
            backdrop={true}>
              <ModalHeader toggle={this.props.toggle}>
                    {this.props.title}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col className="d-flex justify-content-center mb-2">
                        <img src="https://via.placeholder.com/320x200" alt="Generic placeholder image"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="additional">
                            Category: {this.props.category};  Tags:{this.props.tags.map(txt => <span> {txt}</span> )};  Price: {this.props.price}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center mb-2">
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </Col>
                    </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.props.toggle}>
                  Do Something
                </Button>
                <Button color="secondary" onClick={this.props.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
        );
    }
}

export default Details;