import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import apiClient from './Api/ApiClient';
import notfound from './components/404notfound';
import { AppContext, InitialAppContext } from './contexts/AppContext';
import { InitialUserContext, UserContext } from './contexts/UserContext';
import Course from './components/Courses/Course';
import { GlobalErrorMessage } from './components/GlobalMessages/GlobalErrorMessage';
import LessonEdit from './components/Lesson/LessonEdit';
import Lesson from './components/Lesson/LessonView';
import LandingPage from './components/LandingPage/LandingPage';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import NewModule from './components/NewCourse/NewModule';
import NewCourse from './components/NewCourse/NewCourse';
import EditProfile from './components/User Profile/EditProfile';
import { MainLayout } from "./layouts/MainLayout";
import { AppRoute } from "./routing/AppRoute";

const App = () => {
	const [userContext,setUserContext] = useState(InitialUserContext);

	const [appContext,setAppContext] = useState(InitialAppContext);
	
	apiClient.onLogin = (username,userid) =>{
		setUserContext({
			authenticated:true,
			username:username,
			userid:userid
		});
	}

	apiClient.onLogout = () =>{
		setUserContext({
			authenticated:false,
			username:null,
			userid:null
		});
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
						<AppRoute exact path="/" component={LandingPage} layout={MainLayout}/>
						<AppRoute exact path="/signin" component={SignIn} layout={MainLayout}/>
						<AppRoute exact path="/register" component={SignUp} layout={MainLayout}/>
						<AppRoute path="/courseview" component={Course} layout={MainLayout}/>
						<AppRoute exact path="/editprofile" component={EditProfile} layout={MainLayout}/>
						<AppRoute exact path="/lessonview" component={Lesson} layout={MainLayout}/>
						<AppRoute exact path="/editlesson" component={LessonEdit} layout={MainLayout}/>
						<AppRoute exact path="/addNewCourse" component={NewCourse} layout={MainLayout}/>
						<AppRoute exact path="/addModule" component={NewModule} layout={MainLayout}/>

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