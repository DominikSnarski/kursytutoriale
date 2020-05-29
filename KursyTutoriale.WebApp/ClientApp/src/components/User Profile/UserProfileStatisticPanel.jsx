import classnames from 'classnames';
import React, { useState } from 'react';

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

import UserProfileStatisticChart from './UserProfileStatisticChart';

const UserProfileStatisticPanel = () => {
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
                        Participants
          </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => {
                            toggleTabs('2');
                        }}
                    >
                        Progress
          </NavLink>
                </NavItem>

               


            </Nav>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <UserProfileStatisticChart
                        dataNumber={1}
                    />
                </TabPane>
            </TabContent>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="2">
                <UserProfileStatisticChart
                        dataNumber={2}
                    />
                </TabPane>
            </TabContent>

        </Container>

    );
};
export default UserProfileStatisticPanel;