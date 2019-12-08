import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';
import Featured from './components/Main/Featured';
import ShowPagination from './components/List/ShowPagination';
import Course from './components/CourseView/Course';
import apiClient from './components/Auth/ApiClient';
import Footer from './components/Footer/Footer';
import SignInForm from './components/LoginForms/SignInForm';
import SignUpForm from './components/LoginForms/SignUpForm';
import {UserContext} from './components/Context/UserContext';
import {InitialUserContext} from './components/Context/UserContext';
import notfound from './components/404notfound';
import Lesson from './components/Lesson/LessonView';
import EditProfile from './components/User Profile/EditProfile'
import LessonEdit from './components/Lesson/LessonEdit';
import { AppContext, InitialAppContext } from './components/Context/AppContext';
import { GlobalErrorMessage } from './components/GlobalMessages/GlobalErrorMessage';

import NewCourse from './components/NewCourse/NewCourse';
import AddModuleView from './components/Module/AddModuleView';
import SystemService from './components/ApiServices/SystemService';

const App = () => {
    const [showProfile, setShowProfile] = useState(false);
    const toggleProfile = () => {setShowProfile(!showProfile)}
	const [userContext,setUserContext] = useState(InitialUserContext);

	const [appContext,setAppContext] = useState(InitialAppContext);

	const [addNewCourse, setaddNewCourse] = useState(false);


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
						<Route exact path="/" render={() => (
        			    <main className="my-5 py-5" id="Home">
						<NavBar toggleProfile={toggleProfile}/>
						<Search />
						<Container className="px-0">
								<Jumbotron fluid className="Container">
									<Featured  />
									<Jumbotron className="Container" id="Courses"></Jumbotron>
									<Row>
										<Col className="d-none d-lg-flex justify-content-center">
											<ShowPagination />
										</Col>
									</Row>
								</Jumbotron>
							</Container>
						<Footer />
        			    </main>
        			    )} />

						<AppRoute exact path="/signin" component={SignInForm}/>

						<AppRoute exact path="/register" component={SignUpForm}/>

						<Route path="/courseview" render={(props) => (
        			    	<main className="my-5 py-5" id="Home">
								<NavBar toggleProfile={toggleProfile} />
								<Course {...props} />
								<Footer />
        			    	</main>
        			    )}/>

						<AppRoute exact path="/editprofile" component={EditProfile}/>

						<AppRoute exact path="/lessonview" component={Lesson}/>

						<AppRoute exact path="/editlesson" component={LessonEdit}/>
						<AppRoute exact path="/addNewCourse" component={NewCourse}/>
						<AppRoute exact path="/addModule" component={AddModuleView}/>

						<Route component={notfound} />
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

const AppRoute = props => {
	const {component, ...routeProps} = props;
	let Component = component;
	return(
		<Route
		{...routeProps}
		render={(props)=>
			<main className="my-5 py-5" id="Home">
				<NavBar/>
				<Component {...props}/>
				<Footer/>
           	</main>
		}
		/>
	);
}

export default withRouter(App);
