import React from 'react';

// eslint-disable-next-line
import { Form, FormGroup, Row, Col, Container, TabContent, TabPane, Label } from 'reactstrap';

class PaymentStepForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      courseId:  '',
      price: '',
      discount: '', 
    }
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })    
  }
   
  handleSubmit = event => {
    event.preventDefault()
    const { courseId } = this.state
    
  
    event.preventDefault();

    const formData = new FormData(event.target);

    if (formData.get('name') === '') {
      setNameErrorMessage("Name can't be empty. ");
    }

    if (formData.get('surname') === '') {
      setSurnameErrorMessage("Surname can't be empty. ");
    }

    if (
      formData.get('numer1') === '' ||
      formData.get('numer2') === '' ||
      formData.get('numer3') === '' ||
      formData.get('numer4') === ''
    ) {
      setCardNumberErrorMessage(
        'None of the card number fields cannot be empty. ',
      );
    }

    if (
      formData.get('numer1') !== null &&
      formData.get('numer2') !== null &&
      formData.get('numer3') !== null &&
      formData.get('numer4') !== null
    ) {
      if (
        formData.get('numer1').ToString().length !== 4 ||
        formData.get('numer2').ToString().length !== 4 ||
        formData.get('numer3').ToString().length !== 4 ||
        formData.get('numer4').ToString().length !== 4
      )
        setCardNumberErrorMessage(
          'All parts of card number must contains 4 numbers. ',
        );
    }

    if (
      formData.get('expirationDateMonth') === '' ||
      formData.get('expirationDateYear') === ''
    ) {
      setSurnameErrorMessage("Expiration date isn't complete. ");
    }

    if (formData.get('cvv').length !== 3) {
      setSurnameErrorMessage('CVV must contains 3 numbers. ');
    }

    if (
      formData.get('name') === '' ||
      formData.get('surname') === '' ||
      formData.get('numer1') === '' ||
      formData.get('numer2') === '' ||
      formData.get('numer3') === '' ||
      formData.get('numer4') === '' ||
      formData.get('expirationDateMonth') === '' ||
      formData.get('expirationDateYear') === '' ||
      formData.get('cvv') === ''
    ) {
      return;
    }

    const cardNumber =
      formData.get('number1').toString() +
      formData.get('number2').toString() +
      formData.get('number3').toString() +
      formData.get('number4').toString();

    PaymentService.newPayment(
      courseId,
      formData.get('name'),
      formData.get('surname'),
      cardNumber,
      formData.get('expirationDateMonth'),
      formData.get('expirationDateYear'),
      formData.get('cvv'),
      addToList,
    ).then(() => {
      history.push(`/courseview/${courseId}`);
    });
  }
  
  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

/*
* the functions for our button
*/
previousButton() {
  let currentStep = this.state.currentStep;
  if(currentStep !==1){
    return (
      <button 
        className="btn btn-secondary" 
        type="button" onClick={this._prev}>
      Previous
      </button>
    )
  }
  return null;
}

nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <3){
    return (
      <button 
        className="btn btn-primary float-right" 
        type="button" onClick={this._next}>
      Next
      </button>        
    )
  }
  return null;
}
  
  render() {    
    return (
      <React.Fragment>
      <h1>React Wizard Form 🧙‍♂️</h1>
      <p>Step {this.state.currentStep} </p> 

      <form onSubmit={this.handleSubmit}>
      {/* 
        render the form steps and pass required props in
      */}
        <Step1 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          email={this.state.email}
        />
        <Step2 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          username={this.state.username}
        />
        <Step3 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          password={this.state.password}
        />
        {this.previousButton()}
        {this.nextButton()}

      </form>
      </React.Fragment>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  } 
  return(
    <div className="form-group">
      <label htmlFor="email">Email address</label>
      <input
        className="form-control"
        id="email"
        name="email"
        type="text"
        placeholder="Enter email"
        value={props.email}
        onChange={props.handleChange}
        />
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  } 
  return(
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
        className="form-control"
        id="username"
        name="username"
        type="text"
        placeholder="Enter username"
        value={props.username}
        onChange={props.handleChange}
        />
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  } 
  return(
    <React.Fragment>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        className="form-control"
        id="password"
        name="password"
        type="password"
        placeholder="Enter password"
        value={props.password}
        onChange={props.handleChange}
        />      
    </div>
    <button className="btn btn-success btn-block">Sign up</button>
    </React.Fragment>
  );
}

ReactDOM.render(<MasterForm />, document.getElementById('root'))