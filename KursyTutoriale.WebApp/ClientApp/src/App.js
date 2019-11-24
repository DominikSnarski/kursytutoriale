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
import {UserContext} from './components/Context/UserContext';
import {InitialUserContext} from './components/Context/UserContext';

const App = () => {

	const [showCourse, setShowCourse] = useState(false);

    const toggleCourse = () => setShowCourse(!showCourse);


    const [showProfile, setShowProfile] = useState(false);

    const toggleProfile = () => setShowProfile(!showProfile);
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
			<NavBar toggleProfile={toggleProfile} />
			<main className="my-5 py-5" id="Home">
				
				{showProfile && <UserProfile/>}
				{!showProfile && 
				<Search />}
				{showCourse && !showProfile && <Course toggle={toggleCourse}/>}
				{!showProfile && !showCourse && <Container className="px-0">
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
