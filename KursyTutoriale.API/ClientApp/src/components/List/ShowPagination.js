import React, { Fragment } from 'react';
import Pagination from './Pagination';
import { Table, Media, Jumbotron, Container, Button } from 'reactstrap';
import Details from '../Details/Details';
import {Zoom, Fade} from 'react-reveal';

class ShowPagination extends React.Component {
    constructor() {
        super();

        // an example array of items to be paged
        var exampleItems = [...Array(100).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1), category: (i + 2) }));

        this.state = {
            exampleItems: exampleItems,
            pageOfItems: [],
            showDetails: false
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
        this.toggle = this.toggle.bind(this);
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


    render() {

        const classes = this.state.showDetails ? 'fadeIn' : 'fadeOut'

        if (this.state.showDetails)
            return (
                <Fade right>
                <div className="fadeIn">
                    <Jumbotron fluid className="jumbotron_bg">
                        <span className="d-lg-flex justify-content-center d-block h2 text-dark">Course Details</span>
                    </Jumbotron>
                    <Jumbotron fluid className="courses_bg">
                        <Details title="Item1" category="Cat1" tags={["tag1"]} price="free" className={classes}/>
                        <div class="float-right mr-4">
                            <Button color="primary" onClick={this.toggle}>Got To Course's Page</Button>{' '}
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
                <div>
                    <Table className="courses_bg">
                    
                        <thead>
                            <tr>
                                <th scope="row">#</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Category</th>
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
                                    <td>{item.category}</td>
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