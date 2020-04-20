/* eslint-disable import/no-unresolved, import/extensions */
import React, { Fragment, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import apiClient from './api/ApiClient';
import notfound from './components/404notfound';
import { AppContext, InitialAppContext } from './contexts/AppContext';
import { InitialUserContext, UserContext } from './contexts/UserContext';
import Course from './components/Courses/Course';
import { GlobalErrorMessage } from './components/GlobalMessages/GlobalErrorMessage';
import NewLesson from './components/CreateLesson/CreateLesson';
// import LessonEditor from './components/Editors/EditLesson';
import CourseEditor from './components/Editors/EditCourse';
import ModuleEditor from './components/Editors/EditModule';
import Lesson from './components/CreateLesson/LessonView';
import LandingPage from './components/LandingPage/LandingPage';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import NewModule from './components/NewCourse/NewModule';
import NewCourse from './components/NewCourse/NewCourse';
import EditProfile from './components/User Profile/EditProfile';
import UserProfile from './components/User Profile/UserProfile';
import CourseRejectionForm from './components/AdminPanel/CourseRejectionForm';
import Payment from './components/Payments/Payment';
import MainLayout from './layouts/MainLayout';
import AppRoute from './routing/AppRoute';
import AppRoutes from './routing/AppRoutes';
import ProtectedRoute from './routing/ProtectedRoute';
import ModPanel from './components/ModPanel/ModPanel';
import ModRoute from './routing/ModRoute';
import AdminMainPanel from './components/AdminPanel/AdminMainPanel';
import AdminRoute from './routing/AdminRoute';

const App = () => {
  const [userContext, setUserContext] = useState(
    JSON.parse(localStorage.getItem('user')) || InitialUserContext,
  );

  const [appContext, setAppContext] = useState(InitialAppContext);

  apiClient.onLogin = (username, userid, userRoles) => {
    setUserContext({
      authenticated: true,
      username,
      userid,
      userRoles,
    });

    const temp = {
      authenticated: true,
      username,
      userid,
      userRoles,
    };
    localStorage.setItem('user', JSON.stringify(temp));
  };

  apiClient.onLogout = () => {
    setUserContext({
      authenticated: false,
      username: null,
      userid: null,
    });
    localStorage.removeItem('user');
  };

  apiClient.setGlobalMessage = (message) => {
    setAppContext({
      globalErrorMessage: message,
      isGlobalMessageShown: true,
    });
  };

  return (
    <AppContext.Provider value={appContext}>
      <UserContext.Provider value={userContext}>
        <Router>
          <Fragment>
            <Switch>
              <AppRoute
                exact
                path={AppRoutes.Home}
                component={LandingPage}
                layout={MainLayout}
              />
              <AppRoute
                exact
                path={AppRoutes.Signin}
                component={SignIn}
                layout={MainLayout}
              />
              <AppRoute
                exact
                path={AppRoutes.Register}
                component={SignUp}
                layout={MainLayout}
              />
              <ProtectedRoute
                exact
                path={AppRoutes.EditProfile}
                component={EditProfile}
                layout={MainLayout}
              />
              <AppRoute
                path={AppRoutes.CourseviewId}
                component={Course}
                layout={MainLayout}
              />
              <AppRoute
                exact
                path={AppRoutes.Lesson}
                component={Lesson}
                layout={MainLayout}
              />
              <ProtectedRoute
                exact
                path={AppRoutes.CreateLesson}
                component={NewLesson}
                layout={MainLayout}
              />
              <ProtectedRoute
                exact
                path={AppRoutes.EditCourse}
                component={CourseEditor}
                layout={MainLayout}
              />
              <ProtectedRoute
                exact
                path={AppRoutes.EditModule}
                component={ModuleEditor}
                layout={MainLayout}
              />
              <ProtectedRoute
                exact
                path={AppRoutes.EditLesson}
                component={NewLesson}
                layout={MainLayout}
              />
              <ProtectedRoute
                exact
                path={AppRoutes.AddNewCourse}
                component={NewCourse}
                layout={MainLayout}
              />
              <ProtectedRoute
                exact
                path={AppRoutes.AddModule}
                component={NewModule}
                layout={MainLayout}
              />
              <ProtectedRoute
                exact
                path={AppRoutes.UserProfile}
                component={UserProfile}
                layout={MainLayout}
              />
              <ProtectedRoute
                exact
                path={AppRoutes.Payment}
                component={Payment}
                layout={MainLayout}
              />
              <AppRoute
                exact
                path={AppRoutes.CourseRejectionForm}
                component={CourseRejectionForm}
                layout={MainLayout}
              />
              <ModRoute
                exact
                path={AppRoutes.ModPanel}
                component={ModPanel}
                layout={MainLayout}
              />
              <AdminRoute
                exact
                path={AppRoutes.AdminMainPanel}
                component={AdminMainPanel}
                layout={MainLayout}
              />
              <Route component={notfound} layout={MainLayout} />
            </Switch>
          </Fragment>
        </Router>
        <GlobalErrorMessage
          visible={appContext.isGlobalMessageShown}
          message={appContext.globalErrorMessage}
          handleClose={() =>
            setAppContext({
              isGlobalMessageShown: false,
              globalErrorMessage: '',
            })
          }
        />
      </UserContext.Provider>
    </AppContext.Provider>
  );
};

export default withRouter(App);
