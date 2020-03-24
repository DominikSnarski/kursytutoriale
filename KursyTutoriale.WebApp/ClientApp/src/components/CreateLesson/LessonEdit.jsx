/* eslint-disable prefer-template */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Alert,
  Container,
  Col,
  Row,
  FormGroup,
  Form,
  FormFeedback,
} from 'reactstrap';
import { Zoom } from 'react-reveal';
import { LessonService } from '../../api/Services/LessonService';
import LessonPreview from './LessonPreview';
import Kit from './Kit/Kit';
import './style.css';
import Button from '../../layouts/CSS/Button/Button';
import Input from '../../layouts/CSS/InputField/InputField';

function LessonEdit(props) {
  const history = useHistory();

  const [lessonTitle, setLessonTitle] = useState('');
  const blankTextInput = {name: 'text', content:''}
  const [showPreview, setShowPreview] = useState(false);
  const [items, setItems] = useState([{ ...blankTextInput  }]);
  const handleTextChange = (e) => {
    const updatedText = [...items];
    updatedText[e.target.dataset.idx].content = e.target.value;
    setItems(updatedText);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    LessonService.addLesson(
      props.location.state.courseid,
      props.location.state.moduleid,
      formData.get('title'),
      items,
    ).then(() => {
      history.push(`/courseview/${props.location.state.courseid}`);
    });
  };

  if (showPreview) {
    return (
      <Container>
        <LessonPreview
          toggleLessonPreview={() => setShowPreview(!showPreview)}
          items={items}
          title={lessonTitle}
        />
      </Container>
    );
  }

  return (
    <Container fluid>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Row>
          <Col> </Col>

          <Col xs={6}>
            <Container className="Container" >

              <h4>Lesson information</h4>
              <Row className="mb-2">
                <Col>
                  <Zoom left duration="200">
                    <FormGroup className="mt-2">
                      <Input
                        type="text"
                        name="title"
                        id="titleField"
                        placeholder="Lesson's title. Max. 100 characters"
                        onChange={(event) => setLessonTitle(event.target.value)}
                      />
                      <FormFeedback valid>
                        Sweet! that name is available
                      </FormFeedback>
                    </FormGroup>
                  </Zoom>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col>
                  <Zoom left duration="200">
                    <Input
                      type="textarea"
                      name="description"
                      id="descriptionField"
                      placeholder="Lesson's description. Max. 250 characters"
                    />
                  </Zoom>
                </Col>
              </Row>

              <h4>Lesson content</h4>

              <Row className="mb-2">
                <Col>
                  {items.length === 0 && (
                    <Alert className="text-center" color="danger">
                      The lesson is empty!
                    </Alert>
                  )}
                  {items.map((item, key) => {
                    if (item.name === 'text')
                      return (
                        <FormGroup className="mt-2">
                          <Input
                            type='text'
                            name={`text${key}`}
                            id={item.index}
                            data-idx={key}
                            value={items[key].content}
                            onChange={handleTextChange}
/>
                        </FormGroup>
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
                </Col>
              </Row>

              <Row className="mb-2">
                <Col></Col>
              </Row>

              <Row className="mt-5">
                <Col>
                  <Button
                    onClick={() => {
                      history.goBack();
                    }}
                    text="Back"
                  >
                  </Button>
                </Col>
                <Col className="text-right">
                  <Button text="Submit"></Button>
                </Col>
              </Row>
            </Container>
          </Col>

          <Col className="mt-5">
            <Container className="stickyToolKit">
              <Kit
                addTextField={() =>
                  setItems([
                    ...items,
                    {
                      ...blankTextInput
                    },
                  ])
                }
                addImage={(event) => {
                  const file = event.target.files[0];
                  setItems([
                    ...items,
                    {
                      name: 'image',
                      content: URL.createObjectURL(file),
                    },
                  ]);
                }}
                clearLesson={() => setItems([])}
              />
            </Container>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default LessonEdit;
