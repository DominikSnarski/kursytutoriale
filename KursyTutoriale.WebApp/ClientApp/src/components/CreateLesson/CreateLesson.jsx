/* eslint no-param-reassign: ["error", { "props": false }] */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Alert,
  Container,
  FormGroup,
  Form,
  FormFeedback,
  Input,
  Row,
} from 'reactstrap';
import { Zoom } from 'react-reveal';
import Draggable from 'react-draggable';
import { LessonService } from '../../api/Services/LessonService';
import Kit from './Kit/Kit';
import './style.css';
import Button from '../../layouts/CSS/Button/Button';
import InputField from '../../layouts/CSS/InputField/InputField';
import './Kit.css';

function LessonEdit(props) {
  const history = useHistory();
  const [lessonTitle, setLessonTitle] = useState('');
  const blankTextInput = { name: 'text', content: '' };
  const [items, setItems] = useState([{ ...blankTextInput }]);

  const handleTextChange = (e) => {
    const updatedText = [...items];
    updatedText[e.target.dataset.idx].content = e.target.value;
    setItems(updatedText);
  };

  const getBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setItems([
        ...items,
        {
          name: 'image',
          content: reader.result,
        },
      ]);
    };
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

  return (
    <Container fluid>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <Container className="Container">
            <h4>Lesson information</h4>
            <Zoom left duration="200">
              <FormGroup className="mt-2">
                <InputField
                  type="text"
                  name="title"
                  id="titleField"
                  placeholder="Lesson's title. Max. 100 characters"
                  value={lessonTitle}
                  onChange={(event) => setLessonTitle(event.target.value)}
                />
                <FormFeedback valid>Sweet! that name is available</FormFeedback>
              </FormGroup>
            </Zoom>

            <Zoom left duration="200">
              <InputField
                type="textarea"
                name="description"
                id="descriptionField"
                placeholder="Lesson's description. Max. 250 characters"
              />
            </Zoom>

            <h4>Lesson content</h4>

            {items.length === 0 && (
              <Alert className="text-center" color="danger">
                The lesson is empty!
              </Alert>
            )}
            {items.map((item, key) => {
              if (item.name === 'text')
                return (
                  <Input
                    className="input_field mb-3"
                    type="text"
                    name={`text${key}`}
                    id={item.index}
                    data-idx={key}
                    value={items[key].content}
                    onChange={handleTextChange}
                  />
                );
              // eslint-disable-next-line react/jsx-key
              return (
                <Container key={key}>
                  <Row className="justify-content-md-center">
                    <img
                      className="mb-3"
                      src={item.content}
                      alt="Something, somewhere went terribly wrong"
                    />
                  </Row>
                </Container>
              );
            })}

            <Button
              onClick={() => {
                history.push(`/courseview/${props.location.state.courseid}`);
              }}
              text="Back"
            ></Button>
            <Button text="Submit"></Button>
          </Container>
        </div>
      </Form>
      <Draggable>
        <div className="sidenav" cursor="move">
          <div>
            <Kit
              addTextField={() =>
                setItems([
                  ...items,
                  {
                    ...blankTextInput,
                  },
                ])
              }
              addImage={(event) => {
                const file = event.target.files[0];
                getBase64(file);
              }}
              clearLesson={() => setItems([])}
            />
          </div>
        </div>
      </Draggable>
    </Container>
  );
}

export default LessonEdit;
