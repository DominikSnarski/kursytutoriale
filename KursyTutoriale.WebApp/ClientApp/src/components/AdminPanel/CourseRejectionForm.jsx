import React from 'react'; 
import { Button, Container, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
//import { UserContext } from '../../contexts/UserContext';
//import { useHistory } from "react-router-dom";
//import { CourseService } from '../../api/Services/CourseService';

function CourseRejectionForm()
{
  //Należy dodać łączenie z backendem
  /*
    const userContext = useContext(UserContext);
    const history = useHistory();

    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      CourseService.courseRejectionForm(
        new Date(),    
        userContext.userid,
        formData.get('userName'),
        formData.get('courseName'),
        formData.get('reasonOfRejection'),
        formData.get('description'),     
      ).then(()=>{
        history.push('/')
      });
    }
    */

     const handleSubmit = (event) => {
      event.preventDefault();
    }

    return (
        <Container className="justify-content-center" style={{backgroundColor: "#7BC5DA"}}>
        <br/>
        <h1 style={{textAlign: "center"}}>Course rejection form</h1>

        <Form onSubmit={(e)=>handleSubmit(e)}>
        <br/>
        <FormGroup>
          <Row >         
            <Col sm={2} for="userName">
                User name       
            </Col> 
            <Col sm={10}>
                UserName       
            </Col>          
          </Row>
        </FormGroup>

        <br/>

        <FormGroup>
          <Row>         
            <Col sm={2} for="courseame">
                Course Name       
            </Col> 
            <Col sm={10}>
                CourseName      
            </Col>          
          </Row>
        </FormGroup>

        <br/>

        <FormGroup>
          <Row>         
            <Label sm={2} for="reasonOfRejection">Reason of rejection</Label>
            <Col sm={10}>
                <Input type="text" name="title" id="title" placeholder="Set reason of rejection" />         
            </Col>          
          </Row>
        </FormGroup>

        <br/>

        <FormGroup>
          <Row>          
            <Label sm={2} for="description">Description</Label>
            <Col sm={10}>
                <Input type="textarea" name="description" id="exampleText" placeholder="Set description"/> 
            </Col>     
          </Row>
        </FormGroup>

        <br/>
        
          <Row style={{textAlign: "right"}}>
            <Col sm={12}>
            <Button>
                Send
            </Button>
            </Col>
          </Row>
          </Form>

        <br/>
        </Container>
      );
}

export default CourseRejectionForm;