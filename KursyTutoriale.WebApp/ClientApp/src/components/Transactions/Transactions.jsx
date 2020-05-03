import React from 'react';
import { Alert, Col, Container, Table } from 'reactstrap';
import Pagination from '../Shared/Pagination';
import Transaction from '../Transactions/Transaction';
import { PaymentService } from '../../api/Services/PaymentService';

class Transactions extends React.Component {
  constructor() {
    super();
    const exampleItems = [...Array(1)].map((i) => ({
      amount: i,
      paymentMethodDetails: i,
      orderItemName: i,
      date: i,
    }));

    this.state = {
      exampleItems,
      pageOfItems: [],
      isLoading: true,
      error: false,
    };
    // an example array of items to be paged
    // bind function in constructor instead of render
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    PaymentService.getTransactions().then((data) => {
      this.setState({ exampleItems: data, isLoading: false });
    });
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
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
          There is no previous transactions :(
        </Container>
      );
    return (
      <Container>
        <div>
          <Table style={{ backgroundColor: 'transparent' }}>
            <thead>
              <tr>
                <th>Price</th>
                <th>Card number</th>
                <th>Product</th>
                <th>Date</th>
              </tr>
            </thead>
            {this.state.pageOfItems.map((item, i) => (
              <Transaction key={i} transaction={item} />
            ))}
          </Table>
          <Pagination
            items={this.state.exampleItems}
            onChangePage={this.onChangePage}
          />
        </div>
        <hr />
      </Container>
    );
  }
}

export default Transactions;
