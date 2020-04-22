import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import AppRoutes from '../../routing/AppRoutes';
import './style.css';

function CourseListItem(props) {
  return (
    <Link
      style={{ fontSize: '14px', color: 'gray' }}
      className="courseListItem"
      to={`${AppRoutes.Courseview}/${props.course.id}`}
    >
      <div>
        <header style={{ fontSize: '23px', color: 'black' }}>
          {props.course.title}
          <span
            style={{
              fontFamily: 'bold',
              fontSize: '12px',
              color: 'gray',
              marginLeft: '5px',
            }}
          >
            {props.course.price === 0 ? (
              <span>free</span>
            ) : (
              <span>{props.course.price}</span>
            )}
          </span>
        </header>
        <div>{new Moment(props.course.date).fromNow()}</div>
        <div>{props.course.description}</div>
      </div>
    </Link>
  );
}

export default CourseListItem;
