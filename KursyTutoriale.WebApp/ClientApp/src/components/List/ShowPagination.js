import React, { Fragment } from 'react';
import Pagination from './Pagination';
import { Table, Media, Jumbotron, Container, Button, Spinner, Col, Row, Alert } from 'reactstrap';
import Details from '../Details/Details';
import { Fade } from 'react-reveal';
import Filters from '../Filters/Filters';


const API='https://localhost:44354/api/CoursesViewer';

class ShowPagination extends React.Component {
    constructor() {
        super();
        var exampleItems = [...Array(1)].map(i => ({ id: (i + 1), name: i, date:i }));

        this.state = {
            exampleItems: exampleItems,
            pageOfItems: [],
            showDetails: false,
            isLoading: false,
            showFilters: false,
            error: false
        };
        // an example array of items to be paged
        // bind function in constructor instead of render
        this.onChangePage = this.onChangePage.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleFilters = this.toggleFilters.bind(this);
        this.formRef = React.createRef();
        this.formReset = this.formReset.bind(this);

    }

    componentDidMount(){
        this.setState({ isLoading: true });

        //FIRST FETCH FOR NUMBER OF COURSES
        fetch(API+"/GetNumberOfCourses")
        .then(response => response.json())
        .then(data => {  
    
            var nrOfCourses=data;
            var nrOfPages=Math.ceil(data/4)-1;
            //SECOND FETCH FOR ALL COURSES
            fetch(API+"/GetPagesOfCourses?firstPageNumber=0&lastPageNumber="+nrOfPages+"&pageSize=4")
            .then(response => response.json())
            .then(data => {  
                var example=[...Array(nrOfCourses).keys()].map(i => ({ id: (i + 1), name: data[i].title, date:data[i].date }));
                this.setState({ exampleItems: example, isLoading: false });  
    
            })
    
        })
        .catch(error => this.setState({ error, isLoading: false }));
        
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    toggle() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    toggle() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    toggleFilters() {
        this.setState({
            showFilters: !this.state.showFilters
        });
    }

    formReset() {
        this.formRef.current.reset()
        }

    render() {

        if(this.state.error){
            return(
                <Row><Col xs="6" sm="4"></Col>
                <Col sm="12" md={{ size: 10, offset: 1 }}><Alert color="danger">Something went terribly wrong.</Alert></Col>
                <Col sm="4"></Col></Row>
        )
        }
        if(this.state.isLoading)
            return(
                <Row><Col xs="6" sm="4"></Col>
                <Col xs="6" sm="4"><Spinner className="d-lg-flex d-block h2" style={{ width: '3rem', height: '3rem' }} color="primary" /></Col>
                <Col sm="4"></Col></Row>
        )
        if (this.state.showDetails)
            return (
                <Fade right>
                    <div>
                        <Jumbotron fluid className="jumbotron_bg">
                            <span className="d-lg-flex justify-content-center d-block h2 text-dark">Course Details</span>
                        </Jumbotron>
                        <Jumbotron fluid className="courses_bg">
                            <Details title="Item1" category="Cat1" tags={["tag1"]} price="free" />
                            <div class="float-right mr-4">
                                <Button color="primary" onClick={this.props.toggleCourse}>Go to course's page</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Back</Button>
                            </div>
                        </Jumbotron>
                    </div>
                </Fade>
            );
        return (
            <Container>
                <Fade left>
                    <Jumbotron fluid className="jumbotron_bg">
                        <span className="d-lg-flex justify-content-center d-block h2 text-dark">Courses</span>
                    </Jumbotron>
                    <Button color="info" size="xm"
                        onClick={this.toggleFilters}
                    >Filters</Button>
                    <Fade top collapse when={this.state.showFilters}>
                        <Filters formRef={this.formRef} formReset={this.formReset}/>
                    </Fade>
                    <div>
                        <Table className="courses_bg">
                            <thead>
                                <tr>
                                    <th scope="row">#</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            {this.state.pageOfItems.map(item =>
                                <tbody>
                                    <tr onClick={this.toggle}
                                        style={{ cursor: 'pointer' }}>
                                        <td>{item.id}</td>
                                        <td>
                                            <Media src="https://jakewilson.gallerycdn.vsassets.io/extensions/jakewilson/vscode-placeholder-images/0.1.0/1499508629226/Microsoft.VisualStudio.Services.Icons.Default" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.date}</td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                        <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
                    </div>
                    <hr />
                </Fade>
            </Container>
        );
    }
}

export default ShowPagination;
