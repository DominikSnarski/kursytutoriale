import React, { useState } from 'react';

import { Button, Form, Input, Container } from 'reactstrap';
import './CourseSearchbar.css';

const CourseSearchbar = (props) => {
  const [query, setQuery] = useState(props.val);

  const handleSubmit = () => {
    props.onSubmit(query);
  };

  const onTextChanged = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Form inline>
        <Input
          type="search"
          className="form-control-lg"
          placeholder="Search by course name"
          onChange={onTextChanged}
          defaultValue={props.val}
        />
        <Button
          size="lg"
          color="primary"
          outline
          onClick={() => {
            handleSubmit();
          }}
        >
          <span role="img" aria-label="">
            🔍
          </span>
        </Button>
      </Form>
    </Container>
  );
};

export default CourseSearchbar;
