import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Jumbotron } from 'reactstrap';

import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';
import Featured from './components/Main/Featured';
import ShowPagination from './components/List/ShowPagination';
import SignInForm from './components/LoginForms/SignInForm';
import SignUpForm from './components/LoginForms/SignUpForm';
import Footer from './components/Footer/Footer';

const App = () => {

	const [showSignIn, setShowSignIn] = useState(false);
	const [showSignUp, setShowSignUp] = useState(false);
	
	const toggleSignIn = () => setShowSignIn(!showSignIn);
	const toggleSignUp = () => setShowSignUp(!showSignUp);

	return (
		<Fragment>
			<NavBar toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp}/>
			{showSignIn && <SignInForm/>}
			{showSignUp && <SignUpForm/>}
			<main className="my-5 py-5" id="Home">
				<Search />
				<Container className="px-0">
					<Jumbotron fluid className="Container">
						<Featured />
						<Jumbotron className="Container" id="Courses"></Jumbotron>
						<Row>
							<Col className="d-none d-lg-flex justify-content-center">
								<ShowPagination />
							</Col>
						</Row>
					</Jumbotron>
				</Container>
			</main>
			<Footer/>
		</Fragment>
	);
}
export default App;
