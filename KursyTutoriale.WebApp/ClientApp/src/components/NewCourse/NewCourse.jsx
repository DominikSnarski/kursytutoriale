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
import { CourseService } from '../../api/Services/CourseService';
import SystemService from '../../api/Services/SystemService';
import Button from '../../layouts/CSS/Button/Button';
import InputField from '../../layouts/CSS/InputField/InputField';
import SuvreyService from '../../api/Services/SurveyService';
import './NewCourse.css';
import backgroundImage from '../../images/Book_background.jpg';

function NewCourse() {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState();
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [errorMessageDesc, setErrorMessageDesc] = useState('');
  const [errorMessagePrice, setErrorMessagePrice] = useState('');
  const [image, setImage] = useState('');
  const [tagsState, setTagsState] = useState({
    tagsList: [],
    inputValue: '',
    error: '',
  });
  const userContext = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    SystemService.getCurseCreationDefinitions().then((resp) =>
      setTags(resp.data),
    );
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    const newState = { ...tagsState };
    newState.inputValue = value;
    setTagsState({
      ...newState,
    });
  };

  const handleButtonAddClick = () => {
    const { tagsList, inputValue } = tagsState;

    if (inputValue === '') return;

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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTagRemove = (tagId) => {
    const { tagsList } = tagsState;
    const newTagsList = tagsList.filter((tag) => tag.id !== tagId);
    setTagsState({
      ...tagsState,
      tagsList: [...newTagsList],
    });
  };

  const getBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const addImage = (event) => {
    const file = event.target.files[0];
    getBase64(file);
  };

  const { error, tagsList, inputValue } = tagsState;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    setTitleErrorMessage("");
    setErrorMessageDesc("");
    setErrorMessagePrice("");


    if (formData.get('title') === '') {
      setTitleErrorMessage("Title can't be empty");
      return;
    }
    if (formData.get('description') === '') {
      setErrorMessageDesc("Description can't be empty");
      return;
    }
    if (formData.get('price') === '') {
      setErrorMessagePrice("Price can't be empty");
      return;
    }

    CourseService.addCourse(
      formData.get('description'),
      userContext.userid,
      tagsList,
      parseFloat(formData.get('price')),
      formData.get('title'),
      image,
    ).then((response) => {
      SuvreyService.addSurvey(response.data)
      history.push(`/courseview/${response.data}`);
    });
  };

  return (
    <Jumbotron fluid className="jumbotron_newCourse">
      <Zoom duration="200">
        <Container
          className="justify-content-center Container image"
          style={{
            backgroundColor: '#edf3f4',
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opaciy: '0.3',
          }}
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
                    value={title}
                    onChange={handleTitleChange}
                  />
                </Col>
                <Col>
                  <span>{titleErrorMessage}</span>
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
                      tag={tags.find((t) => t.id === tag.id)}
                      handleCloseClick={handleTagRemove}
                    />
                  ))}
                </Col>

                <Col sm={1}>
                  <Button
                    text="Add"
                    type="button"
                    onClick={handleButtonAddClick}
                    width="60px"
                  ></Button>
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
            <Row>
              <p style={{ color: 'red', marginTop: '-2%' }}>{errorMessageDesc}</p>
            </Row>

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
            <Row>
              <p style={{ color: 'red', marginTop: '-2%' }}>{errorMessagePrice}</p>
            </Row>

            <Row>
              <Label sm={2} for="price">
                Image (Optional){' '}
              </Label>
              <Col sm={10}>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      onChange={(event) => addImage(event)}
                      aria-describedby="inputGroupFileAddon01"
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="inputGroupFile01"
                    >
                      Add image
                    </label>
                  </div>
                </div>
              </Col>
            </Row>

            <br />

            <Row className="mt-5">
              <Col>
                <Button
                  text="Back"
                  onClick={() => {
                    history.goBack();
                  }}
                ></Button>
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
