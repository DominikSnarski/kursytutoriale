import React from 'react';
import { Jumbotron, Button, Container, Col, Row } from 'reactstrap';
import { Fade } from 'react-reveal';
import { useHistory, Link } from 'react-router-dom';
import AppRoutes from '../../routing/AppRoutes';

function Lesson(props) {
  const items = JSON.parse(
    props.location.state.lessons[props.location.state.index].content,
  );
  items.map((e, k) => {
    e.Content = JSON.parse(e.Content);
  });
  console.log(items);
  const history = useHistory();

  return (
    <Container className="Container">
      <Fade left duration="200">
        <Jumbotron fluid className="jumbotron_bg">
          <span className="d-lg-flex justify-content-center d-block h2 text-dark">
            {props.location.state.lessons[props.location.state.index].title}
          </span>
        </Jumbotron>

        <Jumbotron className="courses_bg pr-4">
          {items.map((item, key) => {
            if (item.Type.substring(0, 4) === 'text') {
              return (
                <Container>
                  <p>{item.Content}</p>
                  <br />
                </Container>
              );
            }
            // eslint-disable-next-line react/jsx-key
            return (
              <Container key={key}>
                <Row className="justify-content-md-center">
                  <img
                    src={item.Content}
                    alt="Something, somewhere went terribly wrong"
                  />
                </Row>
              </Container>
            );
          })}

          <Row className="mt-5">
            <Col>
              {props.location.state.index !== 0 && (
                <Link
                  to={{
                    pathname: AppRoutes.Lesson,
                    state: {
                      lessons: props.location.state.lessons,
                      index: props.location.state.index - 1,
                      ownerID: props.location.state.ownerID,
                      courseID: props.location.state.courseID,
                    },
                  }}
                >
                  <Button
                    color="secondary"
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    Previous lesson
                  </Button>
                </Link>
              )}
            </Col>
            <Col className="text-right">
              {props.location.state.index !==
                props.location.state.lessons.length - 1 && (
                <Link
                  to={{
                    pathname: AppRoutes.Lesson,
                    state: {
                      lessons: props.location.state.lessons,
                      index: props.location.state.index + 1,
                      ownerID: props.location.state.ownerID,
                      courseID: props.location.state.courseID,
                    },
                  }}
                >
                  <Button
                    color="secondary"
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    Next lesson
                  </Button>
                </Link>
              )}
            </Col>
          </Row>
        </Jumbotron>

        <Row className="mt-5">
          <Col>
            <Button
              color="secondary"
              onClick={() => {
                history.push(`/courseview/${props.location.state.courseID}`);
              }}
            >
              Leave lesson
            </Button>
          </Col>
        </Row>
      </Fade>
    </Container>
  );
}

export default Lesson;
