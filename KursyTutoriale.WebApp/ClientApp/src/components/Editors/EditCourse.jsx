/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Row,
  Label,
  Card,
  CardHeader,
  CardBody,
  Input,
} from 'reactstrap';
import { Fade } from 'react-reveal';
import { useHistory } from 'react-router-dom';
import { CourseService } from '../../api/Services/CourseService';
import SystemService from '../../api/Services/SystemService';
import Tags from '../NewCourse/Tags';
import '../Courses/style.css';
import Button from '../../layouts/CSS/Button/Button';

const CourseEditor = (props) => {
  const history = useHistory();

  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState(props.location.state.title);
  const [description, setDescription] = useState(
    props.location.state.description,
  );
  const [price, setPrice] = useState(props.location.state.price);
  const [tagsState, setTagsState] = useState({
    tagsList: [],
    inputValue: {},
    error: '',
  });

  useEffect(() => {
    SystemService.getCurseCreationDefinitions().then((resp) =>
      setTags(resp.data),
    );
  }, []);

  // onChanging tag
  const handleInputChange = (event) => {
    const { value } = event.target;
    // setInputValue(value);
    const newState = { ...tagsState };
    newState.inputValue = value;
    setTagsState({
      ...newState,
    });
  };

  // onClick button 'Add' tag
  const handleButtonAddClick = () => {
    // setTagsList([...tagsList, inputValue]);
    // setInputValue("");

    const { tagsList } = tagsState;

    // if tag is null
    if (inputValue === '') return;

    // some - return true, if the array contains at least one such element
    // prevents the addition of two of the same tags
    if (tagsList.some((tag) => tag === inputValue)) {
      setTagsState({
        ...tagsState,
        error: 'This tag has already been added',
      });
      return;
    }

    setTagsState({
      error: '',
      tagsList: [...tagsList, { id: inputValue }],
      inputValue: '',
    });
  };

  // onRemove tag
  const handleTagRemove = (tagValue) => {
    setTagsState({
      ...tagsState,
      // return tags which is not like tag toRemove
      tagsList: tagsList.filter((tag) => tag !== tagValue),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    CourseService.editCourse(
      new Date(),
      formData.get('description'),
      tagsList,
      parseFloat(formData.get('price')),
      formData.get('title'),
    ).then((response) => {
      history.push(`/courseview/${response.data}`);
    });
  };

  const { error, tagsList, inputValue } = tagsState;

  return (
    <Container className="Container">
      <Fade left duration="200">
        <Jumbotron fluid className="jumbotron_bg p-4">
          <Input
            className="input_field mb-3"
            type="text"
            name="title"
            id="titleField"
            placeholder="Lesson title, Max. 100 characters"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </Jumbotron>
        <Row className="mb-4">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <img
              src="https://via.placeholder.com/480x320"
              alt="Generic placeholder"
            />
          </Col>
        </Row>

        <Jumbotron className="courses_bg pr-4">
          <Row className="d-flex mb-3">
            <Col className="column-text">
              Price:{' '}
              <Input
                className="input_field mb-3"
                type="text"
                name="title"
                id="titleField"
                placeholder="How much do you charge for this course"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
              />
            </Col>
          </Row>

          <Row className="d-flex mb-3">
            <Col className="column-text">
              Tags:{' '}
              <Input
                type="select"
                name="tags"
                id="tags"
                value={inputValue.name}
                onChange={handleInputChange}
                className="input_field"
              >
                <option value=""></option>
                {tags.map((v, i) => (
                  <option key={i} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </Input>
              {tagsList.map((tag) => (
                <Tags
                  name="tagsList"
                  key={tag}
                  tag={tags.find((t) => t.id === tag.id).name}
                  handleCloseClick={handleTagRemove}
                />
              ))}
            </Col>
            <Col sm={1} className="mt-4">
              <Button text="Add" onClick={handleButtonAddClick} width="60px" />
            </Col>
          </Row>
          <Row>
            <Label sm={2} for="error"></Label>
            <Col sm={10}>
              {!!error && (
                <p>
                  {' '}
                  <br /> {error}{' '}
                </p>
              )}
            </Col>
          </Row>

          <Row className="d-flex justify-content-center mb-2">
            <Col>
              <Card fluid outline style={{ borderColor: '#9dd2e2' }}>
                <CardHeader className="spans">Course details</CardHeader>
                <CardBody style={{ backgroundColor: '#7CC3D8' }}>
                  <Input
                    className="input_field mb-3"
                    type="text"
                    name="description"
                    id="titleField"
                    placeholder="Lesson description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Jumbotron>
      </Fade>

      <Button
        color="secondary"
        text="Back"
        onClick={() => {
          history.push(`/courseview/${props.location.state.courseID}`);
        }}
      />

      <Button color="secondary" onClick={handleSubmit} text="Submit" />
    </Container>
  );
};
export default CourseEditor;
