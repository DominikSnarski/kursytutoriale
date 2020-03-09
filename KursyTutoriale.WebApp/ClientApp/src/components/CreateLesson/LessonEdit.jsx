/* eslint-disable prefer-template */
import React, { useState } from 'react';
import {
    Alert, Button, Container, Col, Row, Input,
    FormGroup
} from 'reactstrap';
import { Zoom } from 'react-reveal';
import LessonPreview from './LessonPreview';
import Footer from '../../layouts/Shared/Footer';
import Kit from './Kit/Kit';
import './style.css';


function LessonEdit (props) {

    const [lessonTitle, setLessonTitle] = useState('');
    const [items, setItems] = useState([{name: 'text0', content: ''}]);
    const [areaText, setAreaText] = useState('');
    const [showPreview, setShowPreview] = useState(false);

        if (showPreview) {
            return <Container>
                    <LessonPreview toggleLessonPreview={() => setShowPreview(!showPreview)} items={items} title={lessonTitle} />
                </Container>
        }

        return <Container fluid>

                <Row>
                    <Col > </Col>

                    <Col xs={6}>
                        <Container className='Container'>
                            <Zoom left duration="200">
                                <Alert color="primary" className="text-center">
                                    Use the toolkit to customize your lesson!
                                </Alert>
                            </Zoom>

                            <h4>Lesson information</h4>
                            <Row className="mb-2">
                                <Col>
                                    <Zoom left duration="200">
                                        <Input type="text" name="title" value={lessonTitle} id="titleField" placeholder="Lesson's title. Max. 100 characters" onChange={(event) => setLessonTitle(event.target.value)} />
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

                            <h4>Lesson content</h4>

                            <Row className="mb-2">
                                <Col>
                                    {items.length === 0 && <Alert className="text-center" color='danger'>The lesson is empty!</Alert>}
                                    {items.map((item) => {
                                        if(item.name.substring(0, 4) === 'text') 
                                            return <FormGroup className="mt-2">
                                                <Input type="textarea" name="text" id="exampleText" areaText={areaText} onChange={(event) => setAreaText(event.target.value)} placeholder={'Lesson content'}/>
                                            </FormGroup>
                                            // eslint-disable-next-line react/jsx-key
                                            return <img src={item.content} alt='Something, somewhere went terribly wrong'/>
                                    })}
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col>
                                </Col>
                            </Row>

                            <Row className='mt-5'>
                                <Col >
                                    <Button color='secondary' onClick={props.toggleLessonEdit}>Back</Button>
                                </Col>
                                <Col className='text-right'>
                                    <Button color='secondary' onClick={() => setShowPreview(!showPreview)}>Next</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>

                    <Col className="mt-5">
                        <Container className="stickyToolKit">
                            <Kit addTextField={() => setItems([...items, {name: "text"+items.length.toString(), content: areaText}])} addImage={(event) => { const file = event.target.files[0]; setItems([...items, {name: "image"+items.length.toString(), content: URL.createObjectURL(file)}])}} clearLesson={() => setItems([])}/>
                        </Container>
                    </Col>
                </Row>
                <Footer />
            </Container>
}

export default LessonEdit;
