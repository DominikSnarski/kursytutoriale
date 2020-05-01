import React from 'react';
import { Container, Spinner } from 'reactstrap';

import './Loader.css';


function Loader() {
  return (
    <Container className="spinner">
      <Spinner></Spinner>
    </Container>
  );
}
export default Loader;
