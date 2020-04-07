
import React from 'react';
import { Fade } from 'react-reveal';
import {
  Alert,
  // Button,
  Col,
  Container,
  // Jumbotron,
  Row,
  Spinner,
  Table,
} from 'reactstrap';
import ModeratorDetails from './ModeratorDetails';
// import Filters from './Filters';
// import Pagination from '../Shared/Pagination';
import { AdminService } from '../../api/Services/AdminService';


class AdminModeratorsPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        listOfUsers: [],
        numberOfUsers: 0,
        isLoading: true,
        error: false
    }
}

  componentDidMount() {
    this.setState({ isLoading: true });

     AdminService.getModeratorsList().then((data) => {
      this.setState({ listOfUsers: data, isLoading: false });

    });


  }

  render() {
    if (this.state.error) {
      return (
        <Row>
          <Col xs="6" sm="4"></Col>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Alert color="danger">Something went terribly wrong.</Alert>
          </Col>
          <Col sm="4"></Col>
        </Row>
      );
    }
    if (this.state.isLoading)
      return (
        <Row>
          <Col xs="6" sm="4"></Col>
          <Col xs="6" sm="4">
            <Spinner
              className="d-lg-flex d-block h2"
              style={{ width: '3rem', height: '3rem' }}
              color="primary"
            />
          </Col>
          <Col sm="4"></Col>
        </Row>
      );
    return (
      <Container>
        <Fade left duration="200">
          <div>
            <Table className="courses_bg">
              <thead>
                <tr>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Id</th>
                </tr>
              </thead>
              {this.state.listOfUsers.map((item, i) => (
                <ModeratorDetails key={i} user={item} />
              ))}
            </Table>

          </div>
          <hr />
        </Fade>
      </Container>
    );
  }
}
export default AdminModeratorsPanel;