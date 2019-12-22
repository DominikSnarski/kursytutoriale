import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import apiClient from './api/ApiClient';
import notfound from './components/404notfound';
import { AppContext, InitialAppContext } from './contexts/AppContext';
import { InitialUserContext, UserContext } from './contexts/UserContext';
import Course from './components/Courses/Course';
import { GlobalErrorMessage } from './components/GlobalMessages/GlobalErrorMessage';
import LessonEdit from './components/CreateLesson/LessonEdit';
import Lesson from './components/CreateLesson/LessonView';
import LandingPage from './components/LandingPage/LandingPage';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import NewModule from './components/NewCourse/NewModule';
import NewCourse from './components/NewCourse/NewCourse';
import EditProfile from './components/User Profile/EditProfile';
import UserProfile from './components/User Profile/UserProfile';
import { MainLayout } from "./layouts/MainLayout";
import { AppRoute } from "./routing/AppRoute";
import { AppRoutes } from "./routing/AppRoutes";
import ProtectedRoute from "./routing/ProtectedRoute";

const App = () => {
	const [userContext,setUserContext] = useState(JSON.parse(localStorage.getItem('user')) || InitialUserContext);

	const [appContext,setAppContext] = useState(InitialAppContext);
	
	apiClient.onLogin = (username,userid) =>{
		setUserContext({
			authenticated:true,
			username:username,
			userid:userid
		});
		let temp = {
			authenticated: true,
			username:username,
			userid:userid
		}
		localStorage.setItem( 'user', JSON.stringify(temp) );
		console.log(localStorage);
	}

	apiClient.onLogout = () =>{
		setUserContext({
			authenticated:false,
			username:null,
			userid:null
		});
		localStorage.removeItem('user');
	}

	apiClient.setGlobalMessage = (message)=>{
		setAppContext({
			globalErrorMessage:message,
			isGlobalMessageShown:true
		});
	}

	return(
		<AppContext.Provider value ={appContext}>
			<UserContext.Provider value={userContext}>
				<Router>
					<Fragment>
						<Switch>
						<AppRoute exact path={AppRoutes.Home} component={LandingPage} layout={MainLayout}/>						
						<AppRoute exact path={AppRoutes.Signin} component={SignIn} layout={MainLayout}/>
						<AppRoute exact path={AppRoutes.Register} component={SignUp} layout={MainLayout}/>
						<AppRoute path={AppRoutes.Courseview} component={Course} layout={MainLayout}/>
						<ProtectedRoute exact path={AppRoutes.EditProfile} component={EditProfile} layout={MainLayout}/>
						<AppRoute exact path={AppRoutes.Lesson} component={Lesson} layout={MainLayout}/>
						<ProtectedRoute exact path={AppRoutes.EditLesson} component={LessonEdit} layout={MainLayout}/>
						<ProtectedRoute exact path={AppRoutes.AddNewCourse} component={NewCourse} layout={MainLayout}/>
						<ProtectedRoute exact path={AppRoutes.AddModule} component={NewModule} layout={MainLayout}/>
						<ProtectedRoute exact path={AppRoutes.UserProfile} component={UserProfile} layout={MainLayout}/>

						<Route component={notfound} layout={MainLayout}/>
						</Switch>
					</Fragment>
				</Router>
				<GlobalErrorMessage
				 visible={appContext.isGlobalMessageShown}
				 message={appContext.globalErrorMessage}
				 handleClose={()=>setAppContext({isGlobalMessageShown:false,globalErrorMessage:""})}
				 />
			</UserContext.Provider>
		</AppContext.Provider>);
}

export default withRouter(App);