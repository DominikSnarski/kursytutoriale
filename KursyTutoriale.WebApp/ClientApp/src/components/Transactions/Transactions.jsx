import React from 'react';
import { Alert, Col, Container, Spinner, Table } from 'reactstrap';
import Pagination from '../Shared/Pagination';
import Transaction from '../Transactions/Transaction';

class Transactions extends React.Component {
  constructor() {
    super();
    const exampleItems = [...Array(5)].map((i) => ({
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
    this.setState({ isLoading: false });
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
