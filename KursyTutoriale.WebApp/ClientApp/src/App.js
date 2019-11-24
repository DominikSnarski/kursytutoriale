import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Jumbotron } from 'reactstrap';


import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';
import Featured from './components/Main/Featured';
import ShowPagination from './components/List/ShowPagination';
import Course from './components/CourseView/Course';
import UserProfile from './components/User Profile/UserProfile';
import Footer from './components/Footer/Footer';

const App = () => {

	const [showCourse, setShowCourse] = useState(false);

    const toggleCourse = () => setShowCourse(!showCourse);


    const [showProfile, setShowProfile] = useState(false);

    const toggleProfile = () => setShowProfile(!showProfile);

	return(
		<Fragment>
			<NavBar toggleProfile={toggleProfile} />
			<main className="my-5 py-5" id="Home">
				
				{showProfile && <UserProfile/>}
				{!showProfile && 
				<Search />}
				{showCourse && !showProfile && <Course toggle={toggleCourse}/>}
				{!showProfile && !showCourse && <Container className="px-0">
					<Jumbotron fluid className="Container">
						<Featured toggleCourse={toggleCourse}/>
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
		</Fragment>);
}

export default App;
