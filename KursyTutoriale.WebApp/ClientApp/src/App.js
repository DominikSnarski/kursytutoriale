import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';
import Featured from './components/Main/Featured';
import ShowPagination from './components/List/ShowPagination';
import Course from './components/CourseView/Course';
import UserProfile from './components/User Profile/UserProfile';
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

import NewCourse from './components/NewCourse/NewCourse';

const App = () => {
    const [showProfile, setShowProfile] = useState(false);
    const toggleProfile = () => {setShowProfile(!showProfile)}
	const [userContext,setUserContext] = useState(InitialUserContext);

	apiClient.onLogin = (username,userid) =>{
		setUserContext({
			authenticated:true,
			username:username,
			userid:userid,

		});
	};

	apiClient.onLogout = () =>{
		setUserContext({
			authenticated:false,
			username:null,
			userid:null
		});
	}

	return(
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

			<Route exact path="/signin" render={() => (
            <main className="my-5 py-5" id="Home">
			<NavBar toggleProfile={toggleProfile} />
			<SignInForm />
			<Footer />
            </main>
            )} />

			<Route exact path="/register" render={() => (
            <main className="my-5 py-5" id="Home">
			<NavBar toggleProfile={toggleProfile} />
			<SignUpForm />
			<Footer />
            </main>
            )} />

			<Route path="/courseview" render={(props) => (
            <main className="my-5 py-5" id="Home">
			<NavBar toggleProfile={toggleProfile} />
			<Course {...props} />
			<Footer />
            </main>
            )} />

			<Route exact path="/editprofile" render={() => (
            <main className="my-5 py-5" id="Home">
			<NavBar toggleProfile={toggleProfile}/>
			<EditProfile/>
			<Footer />
            </main>
            )} />

			<Route exact path="/lessonview" render={() => (
            <main className="my-5 py-5" id="Home">
			<NavBar toggleProfile={toggleProfile} />
			<Lesson />
			<Footer />
            </main>
            )} />

			<Route exact path="/editlesson" render={() => (
            <main className="my-5 py-5" id="Home">
			<NavBar toggleProfile={toggleProfile}/>
			<LessonEdit />
			<Footer />
            </main>
            )} />
			<Route component={notfound} />
			</Switch>
			
		</Fragment>
		</Router>
		</UserContext.Provider>);
}

export default withRouter(App);
