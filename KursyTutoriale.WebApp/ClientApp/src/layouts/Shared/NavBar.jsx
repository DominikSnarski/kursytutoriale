import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav, NavItem} from 'reactstrap';
import { UserContext } from '../../contexts/UserContext';
import apiClient from '../../api/ApiClient';
import AppRoutes from '../../routing/AppRoutes';
import './NavBar.css';

const NavBar = () => {
  const userContext = React.useContext(UserContext);

  const handleSubmit = () => {
    apiClient.logout();
  };

  return (
    <header className="header d-flex flex-row">
      <div className="header_content d-flex flex-row align-items-center">
        <div className="logo_container">
          <div className="logo">
            <span>
              <Link to={AppRoutes.Home} style={{ color: '#3a3a3a' }}>
                kursy tutoriale
              </Link>
            </span>
          </div>
        </div>

        <Nav className="nav_container">
          <NavItem className="nav_item">
            <Link className="font-weight-bold" to={AppRoutes.AddNewCourse}>
              Add New Course
            </Link>
          </NavItem>
        </Nav>
      </div>
      <div className="user_controls d-flex flex-row justify-content-center align-items-center">
        {userContext !== undefined && userContext.authenticated && (
          <span
            className="user_controls_nav"
            onClick={() => {
              handleSubmit();
            }}
            style={{ color: '#BB0000' }}
          >
            Logout
          </span>
        )}
        {userContext !== undefined &&
          userContext.authenticated &&
          userContext.userRoles.includes('Moderator') && (
            <span className="user_controls_nav">
              <Link to={AppRoutes.ModPanel}>
                <Button outline>ModPanel</Button>
              </Link>
            </span>
          )}
        {userContext !== undefined && userContext.authenticated && (
          <span className="user_controls_nav">
            <Link
              to={`/userProfile/${userContext.userid}`}
              style={{ color: '#eaebec', fontWeight: 'bold' }}
            >
              {userContext.username}
            </Link>
          </span>
        )}
        {userContext !== undefined && !userContext.authenticated && (
          <span className="user_controls_nav">
            <Link to={AppRoutes.Signin} style={{ color: '#FFFFFF' }}>
              Sign In
            </Link>
          </span>
        )}
        {userContext !== undefined && !userContext.authenticated && (
          <span className="user_controls_nav">
            <Link to={AppRoutes.Register} style={{ color: '#00BB00' }}>
              Register
            </Link>
          </span>
        )}
      </div>
    </header>
  );
};

export default NavBar;
