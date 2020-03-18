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
import AdminUsersPanel from './AdminUsersPanel';
import AdminModeratorsPanel from './AdminModeratorsPanel';

const AdminMainPanel = () => {
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
            Users
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggleTabs('2');
            }}
          >
            Moderators
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggleTabs('3');
            }}
          >
            Reported comments
          </NavLink>
        </NavItem>

      <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggleTabs('4');
            }}
          >
            Reported courses
          </NavLink>
        </NavItem>

        
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => {
              toggleTabs('5');
            }}
          >
            Statistics
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <AdminUsersPanel />
        </TabPane>
      </TabContent>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="2">
         <AdminModeratorsPanel />
        </TabPane>
      </TabContent>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="3">

        </TabPane>
      </TabContent>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="4">

        </TabPane>
      </TabContent>
    </Container>
  );
};
export default AdminMainPanel;