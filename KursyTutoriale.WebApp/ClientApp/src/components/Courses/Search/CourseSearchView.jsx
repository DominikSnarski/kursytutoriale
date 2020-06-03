import { useHistory } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import { CourseService } from '../../../api/Services/CourseService';
import CourseSearchbar from './CourseSearchbar';
import Details from '../../Details/Details';

const CourseSearchView = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();
  const query = new URLSearchParams(props.location.search).get('query');

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
      CourseService.searchCourses(query).then((response) => {
        setSearchResults(response.data);
      });
    }
  }, [props.id]);

  return (
    <Container>
      <Row>
        <CourseSearchbar
          val={query}
          onSubmit={(q) => {
            history.push(`search?query=${q}`);
            CourseService.searchCourses(q).then((response) => {
              setSearchResults(response.data);
            });
          }}
        />
      </Row>
      {searchResults.map((c, key) => {
        return <Details style={{ padding: '4px' }} key={key} course={c} />;
      })}
    </Container>
  );
};

export default CourseSearchView;
