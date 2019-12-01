import React, { useState } from 'react'; 
import Tags from './Tags';
import { Button, Container, Label, Input, Row, Col } from 'reactstrap';

function NewCourse()
{
    //table of tags
    //setTagsList is used to add tags dynamically
    //const [tagsList, setTagsList] = useState([]);
    //const [inputValue, setInputValue] = useState("");
    const [tagsState, setTagsState] = useState({tagsList: [], inputValue: "", error: ""});

    //onChanging tag
    const handleInputChange = (event) => {
        const { value } = event.target;       
        //setInputValue(value);
        setTagsState({
            ...tagsState,
            inputValue: value
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
            tagsList: [...tagsList, inputValue],
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

    return (
        <Container className="justify-content-center" style={{backgroundColor: "#7BC5DA"}}>
        <br/>
        <h1 style={{textAlign: "center"}}>Add a new course</h1>

        <br/>

          <Row>
            <Label sm={2} for="title">Title</Label>
            <Col sm={10}>
                <Input type="text" name="title" id="title" placeholder="Set title" />         
            </Col>
          </Row>

        <br/>
          
          <Row>
            <Label sm={2} for="tags">Tags</Label>
            <Col sm={9}>
                <Input 
                    type="select" 
                    name="tags" 
                    id="tags"
                    value={inputValue}
                    onChange={handleInputChange}>
                        <option value=""></option>
                        <option value="programming">programming</option>
                        <option value="cooking">cooking</option>
                        <option value="sport">sport</option>
                        <option value="music">music</option>
                </Input>
                {tagsList.map((tag) => (
                    <Tags 
                        key={tag}
                        tag={tag}
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

        <br/>

          <Row>
            <Label sm={2} for="description">Description </Label>
            <Col sm={10}>
                <Input type="textarea" name="text" id="exampleText" placeholder="Set description"/> 
            </Col>
          </Row>

        <br/>

          <Row>
            <Col sm={10}>
            <Button>
                Submit
            </Button>
            </Col>
          </Row>

        <br/>

        </Container>
      );
}

export default NewCourse;