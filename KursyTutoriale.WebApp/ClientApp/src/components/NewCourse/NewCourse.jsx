import Zoom from 'react-reveal/Zoom';
import React, { useState, useContext, useEffect } from 'react';
import { Container, FormGroup, Label, Row, Col, Jumbotron } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { CourseService } from '../../api/Services/CourseService';
import SystemService from '../../api/Services/SystemService';
import Button from '../../layouts/CSS/Button/Button';
import InputField from '../../layouts/CSS/InputField/InputField';

import './NewCourse.css';
import backgroundImage from '../../images/Book_background.jpg';
import ErrorMessage from '../../layouts/CSS/ErrorMessage/ErrorMessage';
import TagsSelect from './TagSelect';

function NewCourse() {
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState('');

  const userContext = useContext(UserContext);

  const [selectedTags, setSelectedTags] = useState([]);

  const history = useHistory();

  useEffect(() => {
    SystemService.getCurseCreationDefinitions().then((resp) =>
      setTags(resp.data),
    );
  }, []);

  const getBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const addImage = (event) => {
    const file = event.target.files[0];
    setImage(getBase64(file));
  };

  const handleSubmit = ({ title, description, price }) =>
    CourseService.addCourse(
      description,
      userContext.userid,
      selectedTags,
      price,
      title,
      image,
    ).then((resp) => history.push(`/courseview/${resp.data}`));

  const newCourseSchema = Yup.object().shape({
    title: Yup.string()
      .max(30, 'Title can contains max 30 characters')
      .required('Field required'),
    description: Yup.string().required('Field required'),
    price: Yup.number().min(0, 'Price cannot be negative'),
  });

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
          <Formik
            initialValues={{ title: '', description: '', price: '' }}
            validationSchema={newCourseSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, handleChange, values }) => (
              <Form>
                <br />
                <FormGroup>
                  <Row>
                    <Label sm={2} for="title">
                      Title
                    </Label>
                    <Col sm={10}>
                      <ErrorMessage
                        message={errors.title}
                        error={!!errors.title}
                      >
                        <InputField
                          type="text"
                          name="title"
                          placeholder="Set title"
                          value={values.title}
                          onChange={handleChange}
                        />
                      </ErrorMessage>
                    </Col>
                  </Row>
                </FormGroup>
                <br />
                <TagsSelect
                  tags={tags}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
                <br />
                <FormGroup>
                  <Row>
                    <Label sm={2} for="description">
                      Description{' '}
                    </Label>
                    <Col sm={10}>
                      <ErrorMessage
                        message={errors.description}
                        error={!!errors.description}
                      >
                        <InputField
                          type="textarea"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          placeholder="Set description"
                        />
                      </ErrorMessage>
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
                      <ErrorMessage
                        message={errors.price}
                        error={!!errors.price}
                      >
                        <InputField
                          type="number"
                          name="price"
                          id="exampleText"
                          placeholder="Set price"
                          value={values.price}
                          onChange={handleChange}
                        />
                      </ErrorMessage>
                    </Col>
                  </Row>
                </FormGroup>

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
            )}
          </Formik>
          <br />
        </Container>
      </Zoom>
    </Jumbotron>
  );
}

export default NewCourse;
