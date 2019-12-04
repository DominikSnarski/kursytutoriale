import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

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

const App = () => {

	const [showCourse, setShowCourse] = useState(false);
	const toggleCourse = () => setShowCourse(!showCourse);


	const [showLesson, setShowLesson] = useState(false);
	const toggleLesson = () => setShowLesson(!showLesson);

    const [showProfile, setShowProfile] = useState(false);

	
	const [showSignIn, setShowSignIn] = useState(false);
	const toggleSignIn = () => {setShowSignIn(!showSignIn); setShowSignUp(false); setShowProfile(false);}
	const [showSignUp, setShowSignUp] = useState(false);
	const toggleSignUp = () => {setShowSignUp(!showSignUp); setShowSignIn(false); setShowProfile(false);}


    const toggleProfile = () => {setShowProfile(!showProfile); setShowSignUp(false); setShowSignIn(false);}
	const [userContext,setUserContext] = useState(InitialUserContext);

	apiClient.onLogin = username =>{
		setUserContext({
			authenticated:true,
			username:username
		});
	};

	apiClient.onLogout = () =>{
		setUserContext({
			authenticated:false,
			username:null
		});
	}

	return(
		<UserContext.Provider value={userContext}>
		<Router>
		<Fragment>
			<Switch>
			<Route exact path="/" render={() => (
            <main className="my-5 py-5" id="Home">
			<NavBar toggleProfile={toggleProfile} toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp}/>
			<Search />
			<Container className="px-0">
					<Jumbotron fluid className="Container">
						<Featured toggleCourse={toggleCourse} />
						<Jumbotron className="Container" id="Courses"></Jumbotron>
						<Row>
							<Col className="d-none d-lg-flex justify-content-center">
								<ShowPagination toggleCourse={toggleCourse}/>
							</Col>
						</Row>
					</Jumbotron>
				</Container>
			<Footer />
            </main>
            )} />

			<Route exact path="/signin" render={() => (
            <main className="my-5 py-5" id="Home">
			<NavBar toggleProfile={toggleProfile} toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp}/>
			<SignInForm />
			<Footer />
            </main>
            )} />

			<Route exact path="/register" render={() => (
            <main className="my-5 py-5" id="Home">
			<NavBar toggleProfile={toggleProfile} toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp}/>
			<SignUpForm />
			<Footer />
            </main>
            )} />

			<Route exact path="/courseview" render={() => (
            <main className="my-5 py-5" id="Home">
			<NavBar toggleProfile={toggleProfile} toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp}/>
			<Course toggle={toggleCourse} toggleLesson={toggleLesson}/>
			<Footer />
            </main>
            )} />

			<Route exact path="/editprofile" render={() => (
            <main className="my-5 py-5" id="Home">
			<NavBar toggleProfile={toggleProfile} toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp}/>
			<EditProfile/>
			<Footer />
            </main>
            )} />

			<Route exact path="/lessonview" render={() => (
            <main className="my-5 py-5" id="Home">
			<NavBar toggleProfile={toggleProfile} toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp}/>
			<Lesson />
			<Footer />
            </main>
            )} />

			<Route exact path="/editlesson" render={() => (
            <main className="my-5 py-5" id="Home">
			<NavBar toggleProfile={toggleProfile} toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp}/>
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

export default App;
