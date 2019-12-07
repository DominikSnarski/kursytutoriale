import React, from 'react'; 
import { Button, Container, Form, FormGroup } from 'reactstrap';
import apiClient from "../Auth/ApiClient";

function NewModule()
{
    return (
        <Router>
          <Container className="justify-content-center" style={{backgroundColor: "#7BC5DA"}}>
          <br/>
          <Form>
          
            <Row>
              <Col sm={10}>
              <Button>
                  Submit
              </Button>
              </Col>
            </Row>
            </Form>
  
          <br/>
  
  
          <Route exact path="/addNewCourse" render={() => (
              <main className="my-5 py-5" id="NewCourse">
              <NavBar toggleProfile={toggleProfile} toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp}/>
              <SignInForm />
              <Footer />
              </main>
              )} />
          </Container>
          </Router>
        );
}