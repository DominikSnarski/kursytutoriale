import classnames from 'classnames';
import React from 'react';
import {
  Badge,
  Button,
  Col,
  Container,
  CustomInput,
  Input,
  Jumbotron,
  Label,
  Media,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import { UserService } from '../../api/Services/UserService';

import FileHelper from '../../utils/FileHelper';
import './style.css';

class EditProfile extends React.Component {
  constructor(props) {
    super();

    this.state = {
      name_value: props.user.name,
      type: 'Author',
      karma: props.user.karma,
      courses: 93,
      karma_color: 'primary',
      courses_color: 'success',
      activeTab: 1,
      slider_val1: '',
      slider_val2: '',
      slider_val3: '',
      slider_val4: '',
      slider_val5: '',
      imageDataUrl: props.user.avatarPath,
      age_value: props.user.age,
      site_value : props.user.siteLink,
      genderName: props.user.genderName,
      description_value: props.user.profileDescription,
    };
    this.toggle = this.toggle.bind(this);
  }

  updateProfile = () => {
    UserService.updateUserProfile(
      this.state.name_value,
      this.state.site_value,
      this.state.age_value,
      this.state.description_value,
      this.state.imageDataUrl,
    ).then(() => this.props.onEditEnd());
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.toggle('1');
  }

  updateValue(event) {
    this.setState({
      slider_val1: event.target.value,
    });
  }

  updateValue2(event) {
    this.setState({
      slider_val2: event.target.value,
    });
  }

  updateValue3(event) {
    this.setState({
      slider_val3: event.target.value,
    });
  }

  updateValue4(event) {
    this.setState({
      slider_val4: event.target.value,
    });
  }

  updateValue5(event) {
    this.setState({
      slider_val5: event.target.value,
    });
  }

  updateNameValue(event) {
    this.setState({
      name_value: event.target.value,
    });
  }

  updateAgeValue(event) {
    this.setState({
      age_value: event.target.value,
    });
  }

  updateSiteValue(event) {
    this.setState({
      site_value: event.target.value,
    });
  }

  updateBirthdayValue(event) {
    this.setState({
      birthday_value: event.target.value,
    });
  }

  updateGenderValue(event) {
    this.setState({
      gender_value: event.target.value,
    });
  }

  updateDescriptionValue(event) {
    this.setState({
      description_value: event.target.value,
    });
  }

  render() {
    return (
      <Jumbotron className="jumbotron_bg">
        <Container className="col_bg about">
          <Row>
            <Col xs="3">
              <Container>
                <Row>
                <Media
                      src={this.state.imageDataUrl}
                      style={{ width: '100%', height: '100%' }}
                      alt="Generic placeholder image"
                    />
                  <CustomInput
                    type="file"
                    label="Pick a file!"
                    onChange={(event) =>
                      FileHelper.getBase64(event.target.files[0], (result) =>
                        this.setState({ imageDataUrl: result }),
                      )
                    }
                  />
                  <hr width="100%"></hr>
                </Row>
                <Row>
                  <Col className="left_side">
                    IT <Label size="sm">{this.state.slider_val1}</Label>
                    <CustomInput
                      onChange={(event) => this.updateValue(event)}
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="left_side">
                    Kitchen <Label size="sm">{this.state.slider_val2}</Label>
                    <CustomInput
                      onChange={(event) => this.updateValue2(event)}
                      type="range"
                      min="0"
                      max="100"
                      step="1"

                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="left_side">
                    DIY <Label size="sm">{this.state.slider_val3}</Label>
                    <CustomInput
                      onChange={(event) => this.updateValue3(event)}
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="left_side">
                    Handcraft <Label size="sm">{this.state.slider_val4}</Label>
                    <CustomInput
                      onChange={(event) => this.updateValue4(event)}
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="left_side">
                    Drawing <Label size="sm">{this.state.slider_val5}</Label>
                    <CustomInput
                      onChange={(event) => this.updateValue5(event)}
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                    />
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col>
              <Container className="right_side">
                <Row>
                  <Row className="row-width mb-3">
                    <Col>
                      <l className="name">{this.state.userName}</l>
                      <p className="text-primary">{this.state.type}</p>
                    </Col>
                    <Col>
                      <Button
                        color="primary"
                        outline
                        className="float-right"
                        onClick={() => this.updateProfile()}
                      >
                        Save profile
                      </Button>
                    </Col>
                  </Row>
                  <Row className="row-width">
                    <Col className="stats" sm="2">
                      <p>Karma</p>
                      <Badge className="badge" color={this.state.karma_color}>
                        {this.state.karma}
                      </Badge>
                    </Col>
                    <Col className="stats">
                      <p>Number of courses</p>
                      <Badge className="badge" color={this.state.courses_color}>
                        {this.state.courses}
                      </Badge>
                    </Col>
                  </Row>

                  <hr width="100%"></hr>
                </Row>
                <Row>
                  <Container>
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === '1',
                          })}
                          onClick={() => {
                            this.toggle('1');
                          }}
                        >
                          <l className="stats">
                            <span role="img" aria-label="">
                              👤
                            </span>{' '}
                            About
                          </l>
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1" className="about">
                        <Row className="mb-3">
                          <Col sm="3">Name</Col>
                          <Col>
                            <Input
                              onChange={(event) => this.updateNameValue(event)}
                              size="sm"
                              type="text"
                              placeholder="name"
                              defaultValue={this.state.name_value}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm="3">Age</Col>
                          <Col>
                            <Input
                              onChange={(event) => this.updateAgeValue(event)}
                              size="sm"
                              type="number"
                              placeholder="age"
                              defaultValue = {this.state.age_value}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm="3">Site</Col>
                          <Col>
                            <Input
                              onChange={(event) => this.updateSiteValue(event)}
                              size="sm"
                              type="url"
                              placeholder="site"
                              defaultValue={this.state.site_value}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm="3">Description</Col>
                          <Col>
                            <Input
                              onChange={(event) => this.updateDescriptionValue(event)}
                              size="sm"
                              type="text"
                              placeholder="Description"
                              defaultValue={this.state.description_value}
                            />
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </Container>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}

export default EditProfile;
