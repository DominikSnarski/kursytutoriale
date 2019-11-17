import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Jumbotron } from 'reactstrap';


import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';
import Featured from './components/Main/Featured';
import ShowPagination from './components/List/ShowPagination';
import UserProfile from './components/User Profile/UserProfile';

const App = () => {

    const [showProfile, setShowProfile] = useState(false);

    const toggleProfile = () => setShowProfile(!showProfile);

	return(
	<Fragment>
		<NavBar toggleProfile={toggleProfile} />
		<main className="my-5 py-5" id="Home">
			{showProfile && <UserProfile/>}
			{!showProfile && 
			<Search />}
			{!showProfile &&<Container className="px-0">
				<Jumbotron fluid className="Container">
					<Featured />
					<Jumbotron className="Container" id="Courses"></Jumbotron>
					<Row>
						<Col className="d-none d-lg-flex justify-content-center">
							<ShowPagination />
						</Col>
					</Row>
				</Jumbotron>
			</Container>}
		</main>
	</Fragment>);
}

export default App;
