/* eslint-disable no-use-before-define */
import Zoom from 'react-reveal/Zoom';
import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Row,
  Col,
  Jumbotron,
  Input,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Tags from './Tags';
import { UserContext } from '../../contexts/UserContext';
import {CourseService} from '../../api/Services/CourseService';
import SystemService from '../../api/Services/SystemService';
import Button from '../../layouts/CSS/Button/Button';
import InputField from '../../layouts/CSS/InputField/InputField';

import './NewCourse.css';
import backgroundImage from '../../images/Book_background.jpg';

function NewCourse() {
  // table of tags
  // setTagsList is used to add tags dynamically
  // const [tagsList, setTagsList] = useState([]);
  // const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsState, setTagsState] = useState({
    tagsList: [],
    inputValue: {},
    error: '',
  });
  const userContext = useContext(UserContext);

  const history = useHistory();

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

  const { error, tagsList, inputValue } = tagsState;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    CourseService.addCourse(
      new Date(),
      formData.get('description'),
      userContext.userid,
      tagsList,
      parseFloat(formData.get('price')),
      formData.get('title')
    ).then(response=>{
      history.push(`/courseview/${response.data}`);
    });
    
  }


  return (
    <Jumbotron fluid className="jumbotron_newCourse">
      <Zoom duration="200">
    <Container
      className="justify-content-center Container"
      style={{ backgroundColor: '#edf3f4', backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat', 
  opaciy: '0.3'}}
    >
      <br />
      <h1>Add a new course</h1>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <br />
        <FormGroup>
          <Row>
            <Label sm={2} for="title">
              Title
            </Label>
            <Col sm={10}>
              <InputField
                type="text"
                name="title"
                id="title"
                placeholder="Set title"
              />
            </Col>
          </Row>
        </FormGroup>

        <br />

        <FormGroup>
          <Row>
            <Label sm={2} for="tags">
              Tags
            </Label>
            <Col sm={9}>
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

            <Col sm={1}>
              <Button text="Add" onClick={handleButtonAddClick} width="60px"></Button>
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
        </FormGroup>

        <br />
        <FormGroup>
          <Row>
            <Label sm={2} for="description">
              Description{' '}
            </Label>
            <Col sm={10}>
              <InputField
                type="textarea"
                name="description"
                id="exampleText"
                placeholder="Set description"
              />
            </Col>
          </Row>
        </FormGroup>

        <br />
        <FormGroup>
          <Row>
            <Label sm={2} for="price">
              Price (in $){' '}
            </Label>
            <Col sm={10}>
              <InputField
                type="number"
                name="price"
                id="exampleText"
                placeholder="Set price"
              />
            </Col>
          </Row>
        </FormGroup>

        <br />

        <FormGroup>
          <Row>
            <Label sm={2} for="date">
              Date of adding course{' '}
            </Label>
            <Col sm={10}>
              <InputField type="datetime" name="date" id="exampleText" />
            </Col>
          </Row>
        </FormGroup>

        <br />

        <Row className="mt-5">
          <Col>
            <Button text="Back" onClick={() => {history.goBack()}}></Button>
          </Col>
          <Col className="text-right">
            <Button text="Submit"></Button>
          </Col>
        </Row>
      </Form>

      <br />
    </Container>
    </Zoom>
    </Jumbotron>
  );
}

export default NewCourse;
