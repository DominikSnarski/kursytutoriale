import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Table } from 'reactstrap';
import CompleteSurvey from './CompleteSurvey';
import Button from '../../../layouts/CSS/Button/Button';

function SurveyList() {
  const history = useHistory();
  const [items] = useState([
    {
      date: '1970-01-01',
      rating: '5 - It is perfect',
      ratingDesc: 'I Think it is perfect',
      learnedSkills: 'Yes',
      lessons: 'Yes',
      lessonsDesc: 'Slow and loud voice',
      recommendation: 'Yes',
      recommendationDesc: 'Everyone needs to learn this skill',
      suggestions: 'No',
    },
    {
      date: '1970-01-01',
      rating: '5 - It is perfect',
      ratingDesc: 'I Think it is perfect',
      learnedSkills: 'Yes',
      lessons: 'Yes',
      lessonsDesc: 'Slow and loud voice',
      recommendation: 'Yes',
      recommendationDesc: 'Everyone needs to learn this skill',
      suggestions: 'No',
    },
    {
      date: '1970-01-01',
      rating: '5 - It is perfect',
      ratingDesc: 'I Think it is perfect',
      learnedSkills: 'Yes',
      lessons: 'Yes',
      lessonsDesc: 'Slow and loud voice',
      recommendation: 'Yes',
      recommendationDesc: 'Everyone needs to learn this skill',
      suggestions: 'No',
    },
  ]);

  return (
    <Container>
      <Table style={{ backgroundColor: 'transparent' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        {items.map((item, i) => (
          <CompleteSurvey key={i} survey={item} num={i+1} />
        ))}
      </Table>
      <Button text='Back' onClick={()=>history.goBack()}/>
    </Container>
  );
}

export default SurveyList;
