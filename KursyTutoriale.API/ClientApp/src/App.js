import React, { Fragment } from 'react';
import axios from 'axios';
import { Container, Row, Col, Jumbotron } from 'reactstrap';

import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';
import Featured from './components/Main/Featured';
import ShowPagination from './components/List/ShowPagination';

const App = () => (
	<Fragment>
		<NavBar />
		<main className="my-5 py-5">
		<Search/>
		<Featured/>
			<Container className="px-0">
				<Jumbotron fluid className="Container" id="Courses">
				<Row>
					<Col className="d-none d-lg-flex justify-content-center">
					<ShowPagination/>
					</Col>
				</Row>
				</Jumbotron>
			</Container>
		</main>
	</Fragment>
);

export default App;
