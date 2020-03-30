import React from 'react';

import { Button, Form, Input, Container } from 'reactstrap';
import './Search.css';

const Search = () => (
  <Container
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <Form inline>
      <Input
        type="search"
        className="form-control-lg"
        placeholder="Search by course name"
      />
      <Button type="submit" size="lg" color="primary" outline>
        <span role="img" aria-label="">
          🔍
        </span>
      </Button>
    </Form>
  </Container>
);

export default Search;
