import React from 'react';
// import './Details.css';
import { Container, Row, Col, Collapse, Media } from 'reactstrap';

class UserDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      isOpen: false,
    };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <tbody>
        <tr onClick={() => this.toggle()} style={{ cursor: 'pointer' }}>
          <td>
            <Media src="https://jakewilson.gallerycdn.vsassets.io/extensions/jakewilson/vscode-placeholder-images/0.1.0/1499508629226/Microsoft.VisualStudio.Services.Icons.Default" />
          </td>

          <td>{this.state.user.userName}</td>
        </tr>
        <Collapse isOpen={this.state.isOpen}>
          <Container>
            <Row>
              <Col className="additional">Email: {this.state.user.email}</Col>
            </Row>

            <Row>
              <Col className="d-flex justify-content-center mb-2">
                {this.state.user.passwordHash}
              </Col>
            </Row>
          </Container>
        </Collapse>
      </tbody>
    );
  }
}
export default UserDetails;
