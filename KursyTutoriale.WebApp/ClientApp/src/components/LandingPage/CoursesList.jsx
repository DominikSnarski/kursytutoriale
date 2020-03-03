import React from 'react';
import { Fade } from 'react-reveal';
import { Alert, Button, Col, Container, Jumbotron, Row, Spinner, Table } from 'reactstrap';
import Details from '../Details/Details';
import Filters from './Filters';
import Pagination from '../Shared/Pagination';
import { CourseService } from '../../api/Services/CourseService';

class CoursesList extends React.Component {
    constructor() {
        super();
        var exampleItems = [...Array(1)].map(i => ({ id: (i + 1), name: i, date:i }));

        this.state = {
            exampleItems: exampleItems,
            pageOfItems: [],
            showDetails: false,
            isLoading: true,
            showFilters: false,
            error: false,
            courseID: ''
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

        CourseService.getCoursePages(0,4)
            .then(data=>{this.setState({exampleItems:data, isLoading: false})});

        //apiClient.fetchCourses(0,4, this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    toggle(id) {
        this.setState({
            showDetails: !this.state.showDetails,
            courseID: id
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
        else { return (
            <Container>
                <Fade left duration="200">
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
                                    <th></th>
                                    <th>Title</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            {this.state.pageOfItems.map((item,id) =>
                                <Details course={item}/>
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
}

export default CoursesList;
