import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Jumbotron } from 'reactstrap';


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

const App = () => {

	const [showCourse, setShowCourse] = useState(false);

    const toggleCourse = () => setShowCourse(!showCourse);

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
		<Fragment>
			<NavBar toggleProfile={toggleProfile} toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp}/>
			<main className="my-5 py-5" id="Home">
				
				{showProfile && <UserProfile username={userContext.username}/>}
				{showSignIn && !showSignUp && !showProfile && <SignInForm />}
				{showSignUp && !showSignIn && !showProfile && <SignUpForm />}
				{!showProfile && !showSignIn && !showSignUp &&
				<Search />}
				{showCourse && !showProfile && <Course toggle={toggleCourse}/>}
				{!showProfile && !showCourse && !showSignIn && !showSignUp &&
				<Container className="px-0">
					<Jumbotron fluid className="Container">
						<Featured />
						<Jumbotron className="Container" id="Courses"></Jumbotron>
						<Row>
							<Col className="d-none d-lg-flex justify-content-center">
								<ShowPagination toggleCourse={toggleCourse}/>
							</Col>
						</Row>
					</Jumbotron>
				</Container>}
				
			</main>

			<Footer />
		</Fragment>
		</UserContext.Provider>);
}

export default App;
