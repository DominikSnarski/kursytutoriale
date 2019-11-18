import React from 'react';
import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, Jumbotron, Media, Badge,
  TabContent, TabPane, Card, CardTitle, CardText, Progress
} from 'reactstrap';
import './style.css';
import Zoom from 'react-reveal/Zoom';
import classnames from 'classnames';


class UserProfile extends React.Component {

    constructor() {
        super();

        this.state = {
            userName: "User",
            type: "Author",
            karma: 421,
            courses: 93,
            karma_color: "primary",
            courses_color: "success",
            activeTab: 1,
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
    render(){

        return(
            <Jumbotron className="jumbotron_bg">
              <Zoom duration="200">
              <Container className="col_bg about">
                <Row>
                  <Col xs="3">
                  <Container>
              <Row>   
                <Media
                    style={{width: 256, height: 256}} 
                    src="https://www.w3schools.com/howto/img_avatar.png" alt="Generic placeholder image" />
                    <hr width="100%"></hr>
              </Row>
              <Row>
                <Col className="left_side">IT
                <Progress value={2 * 5} >Newbie</Progress></Col>
              </Row>
              <Row>
                <Col className="left_side">Kitchen
                <Progress color="success" value="25">Novice</Progress></Col>
              </Row>
              <Row>
                <Col className="left_side">DIY
                <Progress color="info" value={50} >Knows something</Progress></Col>
              </Row>
              <Row>
                <Col className="left_side">Handcraft
                <Progress color="warning" value={75}>Master</Progress></Col>
              </Row>
              <Row>
                <Col className="left_side">Drawing
                <Progress color="danger" value="100">GrandMaster</Progress></Col>
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
                  <Button color="primary" className="float-right">💬 Send message</Button>
                  <Button color="primary" className="float-right" active>Follow</Button>
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
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2' })}
            onClick={() => { this.toggle('2'); }}
          >
           <l class="stats"> 📝 Courses</l>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1" className="about">
        <Row className="mb-3">
                  <Col sm="3">Name</Col>
                  <Col>1</Col>
                </Row>
                <Row className="mb-3">
                <Col sm="3">Age</Col>
                  <Col>1</Col>
                </Row>
                <Row className="mb-3">
                <Col sm="3">E-mail</Col>
                  <Col>1</Col>
                </Row>
                <Row className="mb-3">
                <Col sm="3">Site</Col>
                  <Col>1</Col>
                </Row>
                <Row className="mb-3">
                <Col sm="3">Birthday</Col>
                  <Col>1</Col>
                </Row>
                <Row className="mb-3">
                <Col sm="3">Gender</Col>
                  <Col>1</Col>
                </Row>   
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent></Container></Row>
            </Container>
            </Col>
            </Row>      
           
            </Container></Zoom>
            </Jumbotron>
        );
    };
}

export default UserProfile;
