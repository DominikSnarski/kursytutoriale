import React, { useState, useContext, useEffect } from 'react'; 
import Tags from './Tags';
import { Button, Container, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { UserContext } from '../Context/UserContext';
import { addCourse } from '../../Api/Services/CourseService';
import { useHistory } from "react-router-dom";
import  SystemService  from "../../Api/Services/SystemService";


function NewCourse()
{
    //table of tags
    //setTagsList is used to add tags dynamically
    //const [tagsList, setTagsList] = useState([]);
    //const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsState, setTagsState] = useState({tagsList: [], inputValue: {}, error: ""});
    const userContext = useContext(UserContext);

    const history = useHistory();
    
    useEffect(()=>{
      SystemService.getCurseCreationDefinitions()
      .then(resp => setTags(resp.data));
    },[]);

    //onChanging tag
    const handleInputChange = (event) => {
        const { value } = event.target;    
        //setInputValue(value);
        let newState = {...tagsState};
        newState.inputValue = value;
        setTagsState({
          ...newState
        })
    }

    //onClick button 'Add' tag
    const handleButtonAddClick = () => {
        //setTagsList([...tagsList, inputValue]);
        //setInputValue("");

        const { tagsList } = tagsState;

        //if tag is null
        if(inputValue === "") return;

        //some - return true, if the array contains at least one such element
        //prevents the addition of two of the same tags
        if(tagsList.some(tag => tag === inputValue))
        {
            setTagsState({
                ...tagsState,
                error: "This tag has already been added"
            })
            return;
        }

        setTagsState({
            error: "",
            tagsList: [...tagsList, {id: inputValue}],
            inputValue: ""
        })
    }

    //onRemove tag
    const handleTagRemove = (tagValue) => {
        setTagsState({
            ...tagsState,
            //return tags which is not like tag toRemove
            tagsList: tagsList.filter(tag => tag != tagValue )
        })
    }

    const { error, tagsList, inputValue } = tagsState;

    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      addCourse(
        new Date(),
        formData.get('description'),
        userContext.userid,
        tagsList,
        parseFloat(formData.get('price')),
        formData.get('title')
      )
      .then(resp=>{
        history.push('/addModule')
      });
    }

    return (
        <Container className="justify-content-center" style={{backgroundColor: "#7BC5DA"}}>
        <br/>
        <h1 style={{textAlign: "center"}}>Add a new course</h1>


        <Form onSubmit={(e)=>handleSubmit(e)}>
        <br/>
        <FormGroup>
          <Row>         
            <Label sm={2} for="title">Title</Label>
            <Col sm={10}>
                <Input type="text" name="title" id="title" placeholder="Set title" />         
            </Col>          
          </Row>
        </FormGroup>

        <br/>

        <FormGroup>
          <Row>        
            <Label sm={2} for="tags">Tags</Label>
            <Col sm={9}>
                <Input 
                    type="select" 
                    name="tags" 
                    id="tags"
                    value={inputValue.name}
                    onChange={handleInputChange}>
                        <option value=""></option>
                        {tags.map((v)=><option value={v.id}>{v.name}</option>)}
                </Input>
                {tagsList.map((tag) => (
                    <Tags 
                        name = "tagsList"
                        key={tag}
                        tag={tags.find(t=> t.id === tag.id).name}
                        handleCloseClick={handleTagRemove}
                    />
                ))}            
            </Col>
            
            <Col sm={1}>
                <Button onClick={handleButtonAddClick}>
                        Add
                </Button>   
            </Col>
          </Row>

          <Row>
            <Label sm={2} for="error"></Label>
            <Col sm={10}>
            {!!error &&                
                <p> <br/> { error } </p>
            }        
            </Col>
          </Row>    
          </FormGroup>  

        <br/>
        <FormGroup>
          <Row>          
            <Label sm={2} for="description">Description </Label>
            <Col sm={10}>
                <Input type="textarea" name="description" id="exampleText" placeholder="Set description"/> 
            </Col>
            
          </Row>
          </FormGroup>

        <br/>
        <FormGroup>
          <Row>           
            <Label sm={2} for="price">Price (in $) </Label>
            <Col sm={10}>
                <Input type="number" name="price" id="exampleText" placeholder="Set price"/> 
            </Col>
            
          </Row>
          </FormGroup>

        <br/>
        <FormGroup>
          <Row>           
            <Label sm={2} for="date">Date of adding course </Label>
            <Col sm={10}>
                <Input type="datetime" name="date" id="exampleText"/> 
            </Col>       
          </Row>
          </FormGroup>

        <br/>
        
          <Row>
            <Col sm={10}>
            <Button>
                Submit
            </Button>
            </Col>
          </Row>
          </Form>

        <br/>
        </Container>
      );
}

export default NewCourse;