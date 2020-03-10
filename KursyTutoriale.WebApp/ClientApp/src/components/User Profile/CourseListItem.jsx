import React from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import AppRoutes from '../../routing/AppRoutes';

function CourseListItem(props) {
  return (
    <Card body>
      <Link to={`${AppRoutes.Courseview}/${props.course.id}`}>
        <CardTitle>
          {props.course.title}
          <span style={{ fontSize: '9px', marginLeft: '5px' }}>
            {props.course.price === 0 ? (
              <span>free</span>
            ) : (
              <span>{props.course.price}</span>
            )}
          </span>
        </CardTitle>
      </Link>
      <CardText style={{ fontSize: '14px' }}>
        {new Moment(props.course.date).fromNow()}
      </CardText>
      <CardText>{props.course.description}</CardText>
    </Card>
  );
}

export default CourseListItem;
