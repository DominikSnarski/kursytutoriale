import React from 'react';
import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, Jumbotron, Media, Badge,
  TabContent, TabPane, Card, CardTitle, CardText, Progress, Label, CustomInput
} from 'reactstrap';
import './style.css';
import Zoom from 'react-reveal/Zoom';
import classnames from 'classnames';
import { UserContext } from '../Context/UserContext';


class EditProfile extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            userName: props.username,
            type: "Author",
            karma: 421,
            courses: 93,
            karma_color: "primary",
            courses_color: "success",
            activeTab: 1,
            slider_val1: '',
            slider_val2: '',
            slider_val3: '',
            slider_val4: '',
            slider_val5: ''
        };
        this.toggle=this.toggle.bind(this);
    }

    toggle(tab){
      if(this.state.activeTab!==tab)
      this.setState({activeTab: tab})
    }
    componentWillMount(){
      this.toggle('1')
    }

    updateValue(event){
        this.setState({
            slider_val1: event.target.value
        })
    }
    updateValue2(event){
        this.setState({
            slider_val2: event.target.value
        })
    }
    updateValue3(event){
        this.setState({
            slider_val3: event.target.value
        })
    }
    updateValue4(event){
        this.setState({
            slider_val4: event.target.value
        })
    }
    updateValue5(event){
        this.setState({
            slider_val5: event.target.value
        })
    }

    updateNameValue(event){
        this.setState({
            name_value: event.target.value
        })
    }
    updateAgeValue(event){
        this.setState({
            age_value: event.target.value
        })
    }
    updateSiteValue(event){
        this.setState({
            site_value: event.target.value
        })
    }
    updateBirthdayValue(event){
        this.setState({
            birthday_value: event.target.value
        })
    }
    updateGenderValue(event){
        this.setState({
            gender_value: event.target.value
        })
    }
    render(){

        return(
            <Jumbotron className="jumbotron_bg">
              <Container className="col_bg about">
                <Row>
                  <Col xs="3">
                  <Container>
              <Row>   
                <Media
                    src="https://www.w3schools.com/howto/img_avatar.png" alt="Generic placeholder image" />
                    <CustomInput type="file" label="Pick a file!" />
                    <hr width="100%"></hr>
              </Row>
              <Row>
                <Col className="left_side">IT <Label size="sm">{this.state.slider_val1}</Label>
                <CustomInput onChange={event=>this.updateValue(event)} type="range" min="0" max="100" step="1"/></Col>
              </Row>
              <Row>
                <Col className="left_side">Kitchen <Label size="sm">{this.state.slider_val2}</Label>
                <CustomInput onChange={event=>this.updateValue2(event)} type="range" min="0" max="100" step="1"/></Col>
              </Row>
              <Row>
                <Col className="left_side">DIY <Label size="sm">{this.state.slider_val3}</Label>
                <CustomInput onChange={event=>this.updateValue3(event)} type="range" min="0" max="100" step="1"/></Col>
              </Row>
              <Row>
                <Col className="left_side">Handcraft <Label size="sm">{this.state.slider_val4}</Label>
                <CustomInput onChange={event=>this.updateValue4(event)} type="range" min="0" max="100" step="1"/></Col>
              </Row>
              <Row>
                <Col className="left_side">Drawing <Label size="sm">{this.state.slider_val5}</Label>
                <CustomInput onChange={event=>this.updateValue5(event)} type="range" min="0" max="100" step="1"/></Col>
              </Row>
            </Container>
            </Col>
            <Col>
            <Container className="right_side">
              <Row>
                <Row className="row-width mb-3">
                <Col ><l class="name">{this.state.userName}</l>
                <p className="text-primary">{this.state.type}</p>
                </Col>
                <Col>
                <Button color="primary" outline className="float-right">Save profile</Button>
                  </Col>
                </Row>
                <Row className="row-width">
                <Col className="stats" sm="2"><p>Karma</p>
                <Badge className="badge" color={this.state.karma_color}>{this.state.karma}</Badge>
                </Col>
                <Col className="stats"><p>Number of courses</p>
                <Badge className="badge" color={this.state.courses_color}>{this.state.courses}</Badge>

                </Col>
                </Row>

                <hr width="100%"></hr>
              </Row>
              <Row>
              <Container><Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggle('1'); }}
          >
            <l class="stats">👤 About</l>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1" className="about">
        <Row className="mb-3">
                  <Col sm="3">Name</Col>
                  <Col><Input onChange={event=>this.updateNameValue(event)} size="sm" type="text" placeholder="name" /></Col>
                </Row>
                <Row className="mb-3">
                <Col sm="3">Age</Col>
                    <Col><Input onChange={event=>this.updateAgeValue(event)} size="sm" type="number" placeholder="age" /></Col>
                </Row>
                <Row className="mb-3">
                <Col sm="3">Site</Col>
                    <Col><Input onChange={event=>this.updateSiteValue(event)} size="sm" type="url" placeholder="site" /></Col>
                </Row>
                <Row className="mb-3">
                <Col sm="3">Birthday</Col>
                    <Col><Input onChange={event=>this.updateBirthdayValue(event)} size="sm" type="date" placeholder="birthday" /></Col>
                </Row>
                <Row className="mb-3">
                <Col sm="3">Gender</Col>
                    <Col><Input onChange={event=>this.updateGenderValue(event)} size="sm" type="text" placeholder="gender" /></Col>
                </Row>   
        </TabPane>
      </TabContent></Container></Row>
            </Container>
            </Col>
            </Row>      
           
            </Container>
            </Jumbotron>
        );
    };
}

export default EditProfile;
