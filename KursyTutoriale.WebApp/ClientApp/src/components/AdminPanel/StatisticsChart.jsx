
import React from 'react';
import { Fade } from 'react-reveal';
import {
  Alert,
  // Button,
  Col,
  Container,
  // Jumbotron,
  Row,
  Spinner,
  Table,
} from 'reactstrap';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, VerticalBarSeries,Borders,VerticalGridLines} from 'react-vis';
// import Filters from './Filters';
// import Pagination from '../Shared/Pagination';
import { StatisticsService } from '../../api/Services/StatisticsService';



class AdminStatisticsPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        data: [],
        dataNumber: props.dataNumber,
        isLoading: true,
        error: false
    }
}

   componentDidMount() {
     this.setState({ isLoading: true });


     if(this.state.dataNumber === 1)
     {
        StatisticsService.getCreatedCoursesData().then((result) => {
            this.setState({ data: result, isLoading: false });
        });
     }
     else if(this.state.dataNumber === 2)
     {
        StatisticsService.getCreatedAccountsData().then((result) => {
            this.setState({ data: result, isLoading: false });
        });
     }
     else if(this.state.dataNumber === 3)
     {
        StatisticsService.getSignInData().then((result) => {
            this.setState({ data: result, isLoading: false});
        });
     }
     else if(this.state.dataNumber === 4)
     {
        StatisticsService.getDailySignInData().then((result) => {
            this.setState({ data: result, isLoading: false });
        });
     }

     // console.log(Array.from(result));
     };



  

  render() {
    if (this.state.error) {
      return (
        <Row>
          <Col xs="6" sm="4"></Col>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Alert color="danger">Something went terribly wrong.</Alert>
          </Col>
          <Col sm="4"></Col>
        </Row>
      );
    }
    if (this.state.isLoading)
      return (
        <Row>
          <Col xs="6" sm="4"></Col>
          <Col xs="6" sm="4">
            <Spinner
              className="d-lg-flex d-block h2"
              style={{ width: '3rem', height: '3rem' }}
              color="primary"
            />
          </Col>
          <Col sm="4"></Col>
        </Row>
      );
      if(this.state.dataNumber === 4)
      return (
        <Container>
            <Fade left duration="200">
            
                <XYPlot
                width = {800}
                height = {600}
                    getX={d => d.date}
                    getY={d => d.amount}
                    xDomain= {[0,24]}
                    
                    >
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <XAxis title="Date" position="middle" orientation="bottom" />
                    <YAxis title="Number of courses" position="middle" orientation="left"  />

                    <VerticalBarSeries
                        data= {this.state.data}
                        barWidth={0.1}
                         />
                        
                   
                 
                </XYPlot>
            </Fade>
        </Container>
    );

    return (
            <Container>
                <Fade left duration="200">
                
                    <XYPlot
                    width = {800}
                    height = {600}
                        getX={d => Date.parse(d.date)}
                        getY={d => d.amount}
                        xType="time"
                        >
                        <HorizontalGridLines />
                        <VerticalGridLines />
                        <XAxis title="Date" position="middle" orientation="bottom" />
                        <YAxis title="Number of courses" position="middle" orientation="left"  />

                        <VerticalBarSeries
                            data= {this.state.data}
                            barWidth={0.1}
                             />
                            
                       
                     
                    </XYPlot>
                </Fade>
            </Container>
        );
    }
}
export default AdminStatisticsPanel;