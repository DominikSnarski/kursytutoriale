import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { Col, Container, Jumbotron, Row } from 'reactstrap';
import apiClient from './Api/ApiClient';
import notfound from './components/404notfound';
import { AppContext, InitialAppContext } from './components/Context/AppContext';
import { InitialUserContext, UserContext } from './components/Context/UserContext';
import Course from './components/CourseView/Course';
import Footer from './components/Footer/Footer';
import { GlobalErrorMessage } from './components/GlobalMessages/GlobalErrorMessage';
import LessonEdit from './components/Lesson/LessonEdit';
import Lesson from './components/Lesson/LessonView';
import ShowPagination from './components/List/ShowPagination';
import SignInForm from './components/LoginForms/SignInForm';
import SignUpForm from './components/LoginForms/SignUpForm';
import Featured from './components/Main/Featured';
import AddModuleView from './components/Module/AddModuleView';
import NavBar from './components/NavBar/NavBar';
import NewCourse from './components/NewCourse/NewCourse';
import Search from './components/Search/Search';
import EditProfile from './components/User Profile/EditProfile';



const App = () => {
    const [showProfile, setShowProfile] = useState(false);
    const toggleProfile = () => {setShowProfile(!showProfile)}
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
