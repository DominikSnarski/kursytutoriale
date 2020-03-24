import React from 'react';
import { Jumbotron, Button, Container, Col, Row } from 'reactstrap';
import { Fade } from 'react-reveal';
import { useHistory } from 'react-router-dom';

function Lesson(props) {

  const items = JSON.parse( props.location.state.content );

  const history = useHistory();
  
    return (
      <Container className="Container">
        <Fade left duration="200">
          <Jumbotron fluid className="jumbotron_bg">
            <span className="d-lg-flex justify-content-center d-block h2 text-dark">
              {props.location.state.title}
            </span>
          </Jumbotron>

          <Jumbotron className="courses_bg pr-4">
            {items.map((item, key) => {
                    if (item.Name.substring(0, 4) === 'text')
                      return (
                        <Container>
                        <p>
                          {item.Content}
                        </p>
                        <br />
                        </Container>
                      );
                    // eslint-disable-next-line react/jsx-key
                    return (
                      <img
                        key={key}
                        src={item.content}
                        alt="Something, somewhere went terribly wrong"
                      />
                    );
                  })}

            <Row className="mt-5">
              <Col>
                <Button color="secondary" onClick={() => {history.goBack()}}>
                  Previous lesson
                </Button>
              </Col>
              <Col className="text-right">
                <Button color="secondary" onClick={() => {history.goBack()}}>
                  Next lesson
                </Button>
              </Col>
            </Row>
          </Jumbotron>

          <Row className="mt-5">
            <Col>
                <Button color="secondary" onClick={() => {history.goBack()}}>
                  Leave lesson
                </Button>
            </Col>
            <Col className="text-right">
                <Button color="secondary" onClick={() => {history.goBack()}}>
                  Edit lesson
                </Button>
            </Col>
          </Row>
        </Fade>
      </Container>
    );
}

export default Lesson;
