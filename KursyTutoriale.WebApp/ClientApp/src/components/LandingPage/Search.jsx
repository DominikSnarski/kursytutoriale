import React, { useState } from 'react';

import { Container } from 'reactstrap';
import './Search.css';
import Select from 'react-select';

const Search = (props) => {
  const [options, setOptions] = useState([]);

  const handleChange = (selectedOption) => {
    if (props.onSelection == null) return;
    props.onSelection(selectedOption);
  };

  const handleInputChange = (value) => {
    if (props.onInputChange == null) return;
    props.onInputChange(value).then((response) => {
      setOptions([
        ...response.data.map((v) => {
          return {
            ...v,
            label: v.username ?? v.name,
          };
        }),
      ]);
    });
  };

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Select
        options={options}
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder={props.placeholder}
        openMenuOnClick={false}
        className="bar"
      />
    </Container>
  );
};

export default Search;
