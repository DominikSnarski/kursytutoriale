import React from 'react';
import "./Details.css"
import { Container, Row, Col, Alert, Spinner } from 'reactstrap';
import fetchDetails from '../../api/Services/DetailsService';

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: false,
      title: '',
      price: '',
      description: '',
      category: '',
      tags: ['yes']
    };
  }

  componentDidMount(){
    this.setState({ isLoading: true });

    fetchDetails(this.props.id, this);        
}

  render() {

    if (this.state.error) 
      return (
        <Row><Col xs="6" sm="4"></Col>
          <Col sm="12" md={{ size: 10, offset: 1 }}><Alert color="danger">Something went terribly wrong.</Alert></Col>
          <Col sm="4"></Col></Row>
      )

    if (this.state.isLoading)
      return (
        <Row><Col xs="6" sm="4"></Col>
          <Col xs="6" sm="4"><Spinner className="d-lg-flex d-block h2" style={{ width: '3rem', height: '3rem' }} color="primary" /></Col>
          <Col sm="4"></Col></Row>
      )

    return (
      <Container>

        <Row>
          <Col className="d-flex justify-content-center mb-2">
            <h2>{this.state.title}</h2>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center mb-2">
            <img src="https://via.placeholder.com/320x200" alt="Generic placeholder"/>
          </Col>
        </Row>

        <Row>
          <Col className="additional">
            Tags:{this.state.tags.map(txt => <span> {txt.id}</span>)};  Price: {this.state.price}
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center mb-2">
            {this.state.description}
      </Col>
        </Row>

      </Container>
    );
  }
}
export default Details;