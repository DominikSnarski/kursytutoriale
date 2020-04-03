import React from 'react';
import { Fade } from 'react-reveal';
import {
  Alert,
  Col,
  Container,
  Spinner,
  Table,
} from 'reactstrap';
import Button from '../../layouts/CSS/Button/Button'
import Details from '../Details/Details';
import Filters from './Filters';
import Pagination from '../Shared/Pagination';
import { CourseService } from '../../api/Services/CourseService';
import Button from "../../layouts/CSS/Button/Button";

class CoursesList extends React.Component {
  constructor() {
    super();
    const exampleItems = [...Array(1)].map((i) => ({
      id: i + 1,
      name: i,
      date: i,
    }));

    this.state = {
      exampleItems,
      pageOfItems: [],
      showDetails: false,
      isLoading: true,
      showFilters: false,
      error: false,
      courseID: '',
    };
    // an example array of items to be paged
    // bind function in constructor instead of render
    this.onChangePage = this.onChangePage.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
    this.formRef = React.createRef();
    this.formReset = this.formReset.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    CourseService.getCoursePages(0, 4).then((data) => {
      this.setState({ exampleItems: data, isLoading: false });
    });

    // apiClient.fetchCourses(0,4, this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems });
  }

  toggle(id) {
    this.setState({
      showDetails: !this.state.showDetails,
      courseID: id,
    });
  }

  toggleFilters() {
    this.setState({
      showFilters: !this.state.showFilters,
    });
  }

  formReset() {
    this.formRef.current.reset();
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
        <Fade left duration="200">
          <Button color="transparent" text="Filters" onClick={this.toggleFilters}>
          </Button>
          <Fade top collapse when={this.state.showFilters}>
            <Filters formRef={this.formRef} formReset={this.formReset} />
          </Fade>
          <div>
            <Table style={{backgroundColor:"transparent"}}>
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Date</th>
                </tr>
              </thead>
              {this.state.pageOfItems.map((item, i) => (
                <Details key={i} course={item} />
              ))}
            </Table>
            <Pagination
              items={this.state.exampleItems}
              onChangePage={this.onChangePage}
            />
          </div>
          <hr />
        </Fade>
      </Container>
    );
  }
  
  export default CoursesList;
