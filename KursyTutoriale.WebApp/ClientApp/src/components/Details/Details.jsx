import React from "react";
import "./Details.css";
import { Container, Row, Col, Collapse, Media } from "reactstrap";
import { AppRoutes } from "../../routing/AppRoutes";
import { Link } from "react-router-dom";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: this.props.course,
      isOpen: false
    };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <tbody>
        <tr onClick={() => this.toggle()} style={{ cursor: "pointer" }}>
          <td>
            <Media src="https://jakewilson.gallerycdn.vsassets.io/extensions/jakewilson/vscode-placeholder-images/0.1.0/1499508629226/Microsoft.VisualStudio.Services.Icons.Default" />
          </td>
          <Link to={AppRoutes.Courseview + "/" + this.state.course.id}>
            <td>{this.state.course.title}</td>
          </Link>
          <td>{this.state.course.date}</td>
        </tr>
        <Collapse isOpen={this.state.isOpen}>
          <Container>
            <Row>
              <Col className="additional">Price: {this.state.course.price}</Col>
            </Row>

            <Row>
              <Col className="d-flex justify-content-center mb-2">
                {this.state.course.description}
              </Col>
            </Row>
          </Container>
        </Collapse>
      </tbody>
    );
  }
}
export default Details;
