
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
import UnverifiedCourseDetails from './UnverifiedCourseDetails';
// import Filters from './Filters';
// import Pagination from '../Shared/Pagination';
 import { AdminService } from '../../api/Services/AdminService';


class AdminUnverifiedCoursesPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        listOfCourses: [],
        isLoading: true,
        error: false
    }
}

componentDidMount() {
  this.setState({ isLoading: true });

  AdminService.getCoursesForVerification(10).then((data) => {
    this.setState({ listOfCourses: data.data, isLoading: false });
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
                  <th>Title</th>
                  <th>Date</th>
                  <th>Id</th>
                  <th>OwnerId</th>
                  <th>Price</th>
                </tr>
              </thead>
              {this.state.listOfCourses.map((item, i) => (
                <UnverifiedCourseDetails key={i} course={item} />
              ))}
            </Table>

          </div>
          <hr />
        </Fade>
      </Container>
    );
  }
}
export default AdminUnverifiedCoursesPanel;