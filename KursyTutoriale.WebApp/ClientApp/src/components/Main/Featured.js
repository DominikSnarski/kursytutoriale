import React, { useState } from 'react';
import './style.css';
import {
    Card, CardImg, CardText, Jumbotron, CardImgOverlay,
    CardTitle, Button, Container, Col, Row,
    TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import Details from '../Details/Details';
import Featured2 from '../Showcase/Featured/Featured';
import { Fade } from 'react-reveal';
import classnames from 'classnames';
import TopCategories from '../Showcase/TopCategories/TopCategories';
import TopMentors from '../Showcase/TopMentors/TopMentors';


const Featured = (props) => {

    const [showDetails, setShowDetails] = useState(false);
    const [activeTab, setActiveTab] = useState('1');

    const toggleTabs = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const toggle = () => setShowDetails(!showDetails);



    if (showDetails)
        return (
            <Fade right>
                <div >
                    <Jumbotron fluid className="jumbotron_bg">
                        <span className="d-lg-flex justify-content-center d-block h2 text-dark">Course Details</span>
                    </Jumbotron>
                    <Jumbotron fluid className="courses_bg">
                        <Details title="Item1" category="Cat1" tags={["tag1"]} price="free" description="Lorem " />
                        <div class="float-right mr-4">
                            <Button color="primary" onClick={props.toggleCourse}>Go to course's page</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Back</Button>
                        </div>
                    </Jumbotron>
                </div>
            </Fade>
        );

    return (
        <Container className="Container">
            <Nav tabs>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggleTabs('1'); }}
                    >
                        Featured courses
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggleTabs('2'); }}
                    >
                        Top categories
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggleTabs('3'); }}
                    >
                        Top mentors
                    </NavLink>
                </NavItem>
                
            </Nav>
            
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Featured2 toggle={toggle}/>
                    </TabPane>
                </TabContent>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="2">
                    <TopCategories />
                </TabPane>
            </TabContent>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="3">
                    <TopMentors />
                </TabPane>
            </TabContent>
        </Container>
    );
}
export default Featured;
