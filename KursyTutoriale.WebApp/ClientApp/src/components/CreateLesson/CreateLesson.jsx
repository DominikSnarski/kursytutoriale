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
import { UserContext } from '../../contexts/UserContext';
import Kit from './Kit/Kit';
import './style.css';
import Button from '../../layouts/CSS/Button/Button';
import './Kit.css';
import QuizEditor from './QuizEditor';
import { CreateFolder } from '../../api/Services/DropboxService';


function LessonEdit(props) {
  const history = useHistory();
  const [lessonTitle, setLessonTitle] = useState(props.location.state.title);
  const [lessonDescription, setLessonDescription] = useState(
    props.location.state.description,
  );
  const blankTextInput = { Type: 'text', Content: '' };
  const blankQuizInput = {
    Type: 'quiz',
    Content: {
      questions: [
        {
          question: '',
          answers: ['', ''],
          correct: 0,
        },
      ],
    },
  };
  const [items, setItems] = useState(
    !props.location.state.isEdited
      ? [{ ...blankTextInput }]
      : props.location.state.content,
  );
  const [videoSrc, setVideoSrc] = useState('');
  const userContext = React.useContext(UserContext);

  const handleTextChange = (e) => {
    const updatedText = [...items];
    updatedText[e.target.dataset.idx].Content = e.target.value;
    setItems(updatedText);
  };

  const getBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setItems([
        ...items,
        {
          Type: 'image',
          Content: reader.result,
        },
      ]);
    };
  };

  const updateQuiz = (quiz, key) => {
    const i = items;
    i[key].Content = quiz;
    setItems([...i]);
  };

  const UploadFile = (event) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = () => {
      // (evt)
      // const percentComplete = parseInt((100.0 * evt.loaded) / evt.total);
      // Upload in progress. Do something here with the percent complete.
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        // const fileInfo = JSON.parse(xhr.response);
        // Upload succeeded. Do something here with the file info.
      } else {
        // const errorMessage = xhr.response || 'Unable to upload file';
        // Upload failed. Do something here with the error.
      }
    };
    xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
    xhr.setRequestHeader(
      'Authorization',
      'Bearer Zlau4oTAU_AAAAAAAAAAD4-sRbgu01IRKMjCVFLSpUNmtb7xKMtgx-n6l2DNS1WB',
    );
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader(
      'Dropbox-API-Arg',
      JSON.stringify({
        path: `/${userContext.username}/${props.location.state.courseTitle}/lesson${props.location.state.lessonNumber}.mp4`,
        mode: 'add',
        autorename: true,
        mute: false,
      }),
    );

    xhr.send(event.target.files[0]);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    if (!props.location.state.isEdited) {
      LessonService.addLesson(
        props.location.state.courseid,
        props.location.state.moduleid,
        formData.get('title'),
        formData.get('description'),
        items,
      ).then(() => {
        history.push(`/courseview/${props.location.state.courseid}`);
      });
    } else {
      LessonService.editLesson(
        props.location.state.courseid,
        props.location.state.lessonid,
        formData.get('title'),
        formData.get('description'),
        items,
      ).then(() => {
        history.push(`/courseview/${props.location.state.courseid}`);
      });
    }
  };

  return (
    <Container fluid>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <Container className="Container">
            <h4>Lesson information</h4>
            <Zoom left duration={200}>
              <FormGroup className="mt-2">
                <Input
                  className="input_field mb-3"
                  type="text"
                  name="title"
                  id="titleField"
                  placeholder="Lesson's title. Max. 100 characters"
                  value={lessonTitle ?? ''}
                  onChange={(event) => {
                    setLessonTitle(event.target.value);
                  }}
                />
                <FormFeedback valid>Sweet! that name is available</FormFeedback>
              </FormGroup>
            </Zoom>

            <Zoom left duration={200}>
              <Input
                className="input_field mb-3"
                value={lessonDescription ?? ''}
                type="textarea"
                name="description"
                id="descriptionField"
                placeholder="Lesson's description. Max. 250 characters"
                onChange={(event) => setLessonDescription(event.target.value)}
              />
            </Zoom>

            <h4>Lesson content</h4>

            {videoSrc !== '' && (
              <Container className="video mb-3">
                <Row className="justify-content-md-center">
                  <video controls>
                    <source src={videoSrc} type="video/mp4" />
                  </video>
                </Row>
                </Container>
            )}

            {items.length === 0 && (
              <Alert className="text-center" color="danger">
                The lesson is empty!
              </Alert>
            )}
            {items.map((item, key) => {
              if (item.Type === 'image')
                // eslint-disable-next-line react/jsx-key
                return (
                  <Container key={key}>
                    <Row className="justify-content-md-center">
                      <img
                        className="mb-3"
                        src={item.Content}
                        alt="Something, somewhere went terribly wrong"
                      />
                    </Row>
                  </Container>
                );
              if (item.Type === 'quiz')
                return (
                  <QuizEditor
                    itemIndex={key}
                    quiz={item.Content}
                    updateQuiz={updateQuiz}
                  />
                );
              return (
                <Input
                  key={key}
                  className="input_field mb-3"
                  type="text"
                  name={`text${key}`}
                  id={item.index}
                  data-idx={key}
                  value={items[key].Content}
                  onChange={handleTextChange}
                />
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
              addQuiz={() =>
                setItems([
                  ...items,
                  {
                    ...blankQuizInput,
                  },
                ])
              }
              addVideo={(event) => {
                const file = URL.createObjectURL(event.target.files[0]);
                setVideoSrc(file);
                CreateFolder(
                  `${userContext.username}/${props.location.state.courseTitle}`,
                );
                UploadFile(event);
              }}
              clearLesson={() => {
                setItems([]);
                setVideoSrc('');
              }}

            />
          </div>
        </div>
      </Draggable>
    </Container>
  );
}

export default LessonEdit;
