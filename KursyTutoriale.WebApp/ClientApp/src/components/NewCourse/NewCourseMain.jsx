import React, {useState} from 'react';
import NewCourse from './NewCourse';
import NewModule from './NewModule';
import LessonEdit from '../CreateLesson/LessonEdit';
import {Jumbotron} from 'reactstrap';

const NewCourseMain = () => {

    const [showNewCourse, setShowNewCourse] = useState(true);
    const [showLesson, setShowLesson] = useState(false);
    const [courseId, setCourseId] = useState(0);
    const [moduleId, setModuleId] = useState(0);

    return (

        <Jumbotron fluid className="jumbotron_bg">
            {showNewCourse && <NewCourse showCourse={setShowNewCourse} setCourseId={setCourseId}/>}
            {!showNewCourse && !showLesson && <NewModule show={setShowLesson} courseId={courseId} setModuleId={setModuleId}/>}
            {showLesson && <LessonEdit courseId={courseId} moduleId={moduleId}/>}
        </Jumbotron>
        
    );


    
}

export default NewCourseMain;