import { useRouteMatch } from 'react-router-dom';
import React from 'react';
import CourseViewer from './CourseViewer';
import './style.css';

const Course = (props) => {
  const match = useRouteMatch();

  return <CourseViewer id={match.params.id} {...props} />;
};
export default Course;
