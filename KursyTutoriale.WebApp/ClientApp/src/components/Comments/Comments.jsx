import React from 'react';
import { Alert, Col, Container, Spinner, Table, Input, Form } from 'reactstrap';
import Button from '../../layouts/CSS/Button/Button';
import Pagination from '../Shared/Pagination';
import Comment from '../Comments/Comment';
import {CommentService} from '../../api/Services/CommentService';

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exampleItems: this.props.comments,
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
    this.formRef = React.createRef();
    this.formReset = this.formReset.bind(this);
    this.sendComment = this.sendComment.bind(this);
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

  
  sendComment = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    CommentService.addComment(
      formData.get('comment'),
      this.props.courseID
    )
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
          <Form onSubmit={(e) => this.sendComment(e)}>
          <Input
            type="textarea"
            id="comment_text"
            className="input_field"
            name='comment'
            maxLength="500"
            style={{ minHeight: 150, resize: 'none' }}
            onChange={(e) => this.getComment(e.target.value)}
          />
          </Form>
          <Button text="Comment" onClick={(event) => this.sendComment(event)}></Button>
        </Container>
        { <div>
          <Table style={{ backgroundColor: 'transparent' }}>
            <thead>
              <tr></tr>
            </thead>
            {this.state.pageOfItems.map((item, i) => (
              <div key={i}>
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
        </div>}
        <hr />
      </Container>
    );
  }
}

export default Comments;
