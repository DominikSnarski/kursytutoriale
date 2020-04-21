import classnames from 'classnames';
import React, { useState, useEffect } from 'react';

import {
    // Button,
    Container,
    // Jumbotron,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap';

import StatisticsChart from './StatisticsChart';
import { StatisticsService } from '../../api/Services/StatisticsService';

const AdminStatisticsPanel = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggleTabs = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);

    };



    return (
        <Container className="Container">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => {
                            toggleTabs('1');
                        }}
                    >
                        Created Courses
          </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => {
                            toggleTabs('2');
                        }}
                    >
                        Created Accounts
          </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => {
                            toggleTabs('3');
                        }}
                    >
                        SignIn Data
          </NavLink>
                </NavItem>
                
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '4' })}
                        onClick={() => {
                            toggleTabs('4');
                        }}
                    >
                        Daily SignIn Data
          </NavLink>
                </NavItem>


            </Nav>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <StatisticsChart
                        dataNumber={1}
                    />
                </TabPane>
            </TabContent>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="2">
                <StatisticsChart
                        dataNumber={2}
                    />
                </TabPane>
            </TabContent>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="3">
                <StatisticsChart
                        dataNumber={3}
                    />
                </TabPane>
            </TabContent>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="4">
                <StatisticsChart
                        dataNumber={4}
                    />
                </TabPane>
            </TabContent>

        </Container>

    );
};
export default AdminStatisticsPanel;