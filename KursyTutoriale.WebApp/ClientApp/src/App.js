import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Jumbotron } from 'reactstrap';

import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';
import Featured from './components/Main/Featured';
import ShowPagination from './components/List/ShowPagination';
import Course from './components/CourseView/Course';

const App = () => {

	const [showCourse, setShowCourse] = useState(false);

    const toggleCourse = () => setShowCourse(!showCourse);

	return(
	<Fragment>
		<NavBar />
		<main className="my-5 py-5" id="Home">
			<Search />
			{showCourse && <Course toggle={toggleCourse}/>}
			{!showCourse && 
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
	</Fragment>
);
	}
export default App;
