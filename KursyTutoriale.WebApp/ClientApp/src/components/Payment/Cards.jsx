import React from 'react';
import { Alert, Col, Container, Spinner, Table } from 'reactstrap';
import Card from '../Payment/Card';
import { PaymentService } from '../../api/Services/PaymentService';

class Cards extends React.Component {
  constructor() {
    super();

    this.state = {
      pageOfItems: [],
      isLoading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    PaymentService.getCreditCards().then((data) => {
      this.setState({ pageOfItems: data, isLoading: false });
    });
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }

  render() {
    if (this.state.error) {
      return (
        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Col xs="6" sm="4"></Col>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Alert color="danger">Something went terribly wrong.</Alert>
          </Col>
          <Col sm="4"></Col>
        </Container>
      );
    }
    if (this.state.isLoading)
      return (
        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Col xs="6" sm="4"></Col>
          <Col xs="6" sm="4">
            <Spinner
              className="d-lg-flex d-block h2"
              style={{ width: '3rem', height: '3rem' }}
              color="primary"
            />
          </Col>
          <Col sm="4"></Col>
        </Container>
      );
    return (
      <Container>
        <div>
          <Table style={{ backgroundColor: 'transparent' }}>
            <thead>
              <tr></tr>
            </thead>
            {this.state.pageOfItems.map((item, i) => (
              <Card key={i} card={item} deleteable={this.props.deleteable} courseId={this.props.courseId}/>
            ))}
          </Table>
        </div>
        <hr />
      </Container>
    );
  }
}

export default Cards;
