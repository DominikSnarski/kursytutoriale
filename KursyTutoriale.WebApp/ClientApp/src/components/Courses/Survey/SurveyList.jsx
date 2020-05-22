import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Table, Row, Col, Spinner, Alert } from 'reactstrap';
import CompleteSurvey from './CompleteSurvey';
import Button from '../../../layouts/CSS/Button/Button';
import { SurveyService } from '../../../api/Services/SurveyService';

function SurveyList(props) {
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courseLoaded, setListLoaded] = useState(false);
  const [error] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      SurveyService.getSurvey(props.location.state.id).then((response) => {
        setItems([response.data]);
        setListLoaded(true);
      });
    }
  }, []);

  if (error) {
    return (
      <Row>
        <Col xs="6" sm="4"></Col>
        <Col sm="12" md={{ size: 10, offset: 1 }}>
          <Alert color="danger">Something went terribly wrong.</Alert>
        </Col>
        <Col sm="4"></Col>
      </Row>
    );
  }
  if (!courseLoaded) {
    return (
      <Row>
        <Col xs="6" sm="4"></Col>
        <Col xs="6" sm="4">
          <Spinner
            className="d-lg-flex d-block h2"
            style={{ width: '3rem', height: '3rem' }}
            color="primary"
          />
        </Col>
        <Col sm="4"></Col>
      </Row>
    );
  }

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
