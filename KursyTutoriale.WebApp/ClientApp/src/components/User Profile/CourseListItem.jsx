import React from 'react';
import { Card, CardTitle, CardText} from 'reactstrap';
import {AppRoutes} from '../../routing/AppRoutes';
import {Link} from 'react-router-dom';

function CourseListItem(props){
    return(
        <Card body>
            <Link to={{pathname: AppRoutes.Courseview, state:{courseID: props.course.id}}}>
                <CardTitle>{props.course.title}<span style={{fontSize:"9px",marginLeft:"5px"}}>
                    {props.course.price === 0 ? 
                        <span>free</span> : 
                        <span>{props.course.price}</span>}</span>
                </CardTitle>
            </Link>
            <CardText></CardText>
            <CardText>{props.course.description}</CardText>
        </Card>
    );
}

export default CourseListItem;
