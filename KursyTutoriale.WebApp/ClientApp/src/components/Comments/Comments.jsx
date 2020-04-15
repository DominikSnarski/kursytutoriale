import React from 'react';
import { Fade } from 'react-reveal';
import { Alert, Col, Container, Spinner, Table, Input, Row } from 'reactstrap';
import Button from '../../layouts/CSS/Button/Button';
import Pagination from '../Shared/Pagination';
import Comment from '../Comments/Comment';

class Comments extends React.Component {
  constructor() {
    super();
    const exampleItems = [...Array(5)].map((i) => ({
      user: 'Sample_User',
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
      date: '2019-1-1',
    }));

    this.state = {
      exampleItems,
      pageOfItems: [],
      showDetails: false,
      isLoading: true,
      showFilters: false,
      error: false,
      courseID: '',
      comment: '',
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
    this.setState({ isLoading: false });
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

  toggleFilters() {}

  send_comment() {
    var help = new Array();
    help = this.state.exampleItems;
    help.push({ user: 'JUREK', comment: this.state.comment, date: "12-12-12"});
    this.setState({
        exampleItems: help,
    });
  }

  getComment(e) {
    this.setState({
      comment: e,
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
        <Container className="p-5">
          <Input
            type="textarea"
            id="comment_text"
            className="input_field"
            maxLength="500"
            style={{ minHeight: 150, resize: 'none' }}
            onChange={(e) => this.getComment(e.target.value)}
          />
          <Button text="Comment" onClick={(e) => this.send_comment()}></Button>
        </Container>
        <div>
          <Table style={{ backgroundColor: 'transparent' }}>
            <thead>
              <tr></tr>
            </thead>
            {this.state.pageOfItems.map((item, i) => (
              <div>
                <Comment key={i} comment={item} />
                <Container>
                  <Button
                    text="Report"
                    color="red"
                    width={50}
                    height={30}
                    fontSize={10}
                  ></Button>
                </Container>
              </div>
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

export default Comments;
