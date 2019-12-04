import React from 'react';
import {
    Jumbotron, Button, Container, Col, Row
} from 'reactstrap';
import { Fade } from 'react-reveal';
import LessonEdit from './LessonEdit';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Link } from 'react-router-dom'

class Lesson extends React.Component {

    constructor() {
        super();

        var exampleContents = [{ name: 'text', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor lacus, congue a rutrum a, consectetur et justo. Nulla laoreet, tortor eget faucibus cursus, lorem erat rutrum nunc, quis varius augue dolor in turpis.' },
        { name: 'question', value: 'How much is 2+2?', answers: { 1: '3', 2: '22', 3: '4' }, correctAnswer: 3, type: 'radio' },
        { name: 'text', value: 'One under another.' },
        { name: 'multipleAnswersQuestion', value: 'что это?', answers: ['это штахета.', 'чики брики в дамке', 'nudy'], correctAnswers: [1, 2] },
        { name: 'image', value: 'https://via.placeholder.com/480x320', alt: 'We are sorry but we have lost this image.' }];

        this.state = {
            exampleContents: exampleContents,
            showLessonEdit: false
        }

        this.toggleLessonEdit = this.toggleLessonEdit.bind(this);
    }

    toggleLessonEdit(){
        this.setState({showLessonEdit: !this.state.showLessonEdit})
    }

    render() {
        if(this.state.showLessonEdit)
        {
            return(
                <DndProvider backend={HTML5Backend}>
					<LessonEdit toggleLessonEdit={this.toggleLessonEdit} />
				</DndProvider>
            )
        }
        return (
            <Container className='Container'>
                <Fade left duration="200">

                    <Jumbotron fluid className='jumbotron_bg'>
                        <span className='d-lg-flex justify-content-center d-block h2 text-dark'>Lesson's Title</span>
                    </Jumbotron>

                    <Jumbotron className='courses_bg pr-4'>

                        {this.state.exampleContents.map(item =>

                            <div>
                                
                                {item.name == 'text' && item.value}{' '}
                                
                                {item.name == 'image' &&
                                    <Row>
                                        <Col className="d-flex justify-content-center mb-2">
                                            <img src={item.value} alt={item.alt} />
                                        </Col>
                                    </Row>
                                }

                                {item.name == 'video' &&
                                    <Row>
                                        <Col className="d-flex justify-content-center mb-2">
                                            <video width="480" controls>
                                                <source src={item.value} type="video/mp4" />
                                                Your browser does not support HTML5 video.
                                            </video>
                                        </Col>
                                    </Row>
                                    
                                }
                            </div>)}

                        <Row className='mt-5'>
                            <Col >
                                <Button color='secondary' onClick={this.props.toggleLesson}>Previous lesson</Button>
                            </Col>
                            <Col className='text-right'>
                                <Button color='secondary' onClick={this.props.toggleLesson}>Next lesson</Button>
                            </Col>
                        </Row>

                    </Jumbotron>


                    <Row className='mt-5'>
                            <Col >
                                <Link to="/courseview"><Button color='secondary' onClick={this.props.toggleLesson}>Leave lesson</Button></Link>
                            </Col>
                            <Col className='text-right'>
                                <Link to="/editlesson"><Button color='secondary' onClick={this.toggleLessonEdit}>Edit lesson</Button></Link>
                                
                            </Col>
                        </Row>

                </Fade>
            </Container>
        );
    }


}
export default Lesson;
