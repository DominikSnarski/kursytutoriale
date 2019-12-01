import React from 'react';
import {
    Alert, Button, Container, Col, Row, Input, InputGroup, InputGroupAddon,
    FormText,  FormGroup
} from 'reactstrap';
import { Zoom } from 'react-reveal';
import LessonPreview from './LessonPreview';


class LessonEdit extends React.Component {

    constructor() {
        super();

        this.state = {
            lessonTitle: '',
            list: [],
            areaText: '',
            file: '',
            imagePreviewURL: null,
            showPreview: false
        }

        this.titleChange = this.titleChange.bind(this);
        this.textAreaChange = this.textAreaChange.bind(this);
        this.addText = this.addText.bind(this);
        this.addFile = this.addFile.bind(this);
        this.fileChange = this.fileChange.bind(this);
        this.toggleLessonPreview = this.toggleLessonPreview.bind(this);
    }

    toggleLessonPreview(){
        this.addText();
        this.addFile();
        this.setState({showPreview: !this.state.showPreview})
    }

    titleChange(event) {
        this.setState({ lessonTitle: event.target.value });
    }

    textAreaChange(event) {
        this.setState({ areaText: event.target.value })
    }

    addText = () => {
        this.setState(state => {
            const list = [...state.list, { name: 'text', value: state.areaText }];
            return {
                list,
                areaText: '',
            };
        });
        console.log(this.state.list);
    };

    fileChange = event => {
        this.setState({
          selectedFile: event.target.files[0]
        })
     
        let reader = new FileReader();
         
        reader.onloadend = () => {
          this.setState({
            imagePreviewUrl: reader.result
          });
        }

        reader.readAsDataURL(event.target.files[0])
        console.log(this.state.imagePreviewURL);
      }

    addFile = () => {
        this.setState(state => {
            const list = [...state.list, { name: 'image', value: 'https://via.placeholder.com/480x320'}];
            return {
                list,
                file: '',
            };
        });
    };

    render() {

        if(this.state.showPreview)
        {
            return(
                <Container>
                    <LessonPreview toggleLessonPreview={this.toggleLessonPreview} items={this.state.list} title={this.state.lessonTitle}/>
                </Container>
            )
        }

        return (
            <Container className='Container'>
                <Zoom left duration="200">
                    <Alert color="primary" className="text-center">
                        Create lesson
                    </Alert>
                </Zoom>

                <h4>Lesson's information</h4>
                <Row className="mb-2">
                    <Col>
                        <Zoom left duration="200">
                            <Input type="text" name="title" value={this.state.lessonTitle} id="titleField" placeholder="Lesson's title. Max. 100 characters" onChange={this.titleChange} />
                        </Zoom>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col>
                        <Zoom left duration="200">
                            <Input type="textarea" name="description" id="descriptionField" placeholder="Lesson's description. Max. 250 characters" />
                        </Zoom>
                    </Col>
                </Row>

                <h4>Lesson's content</h4>
                <Row className="mb-2">
                    <Col>
                        <Zoom left duration="200">
                            <FormGroup>
                                <Input type="textarea" name="text" id="exampleText" areaText={this.state.areaText} onChange={this.textAreaChange} />
                            </FormGroup>
                        </Zoom>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col>
                        <Zoom left duration="200">
                            <InputGroup>
                                <Input type="file" name="file" multiple onChange={this.fileChange}/>
                                <InputGroupAddon addonType="prepend"><Button onClick={this.addFIle}>Add file</Button></InputGroupAddon>
                                <FormText color="muted">
                                    Choose a .JPG .MP4 file.
                                    Your files will appear at the bottom of the lesson. 
                                </FormText>
                            </InputGroup>
                        </Zoom>
                    </Col>
                </Row>

                <Row className='mt-5'>
                            <Col >
                                <Button color='secondary' onClick={this.props.toggleLessonEdit}>Back</Button>
                            </Col>
                            <Col className='text-right'>
                                <Button color='secondary' onClick={this.toggleLessonPreview}>Next</Button>
                            </Col>
                        </Row>

            </Container>
        );
    }
}

export default LessonEdit;

