/* eslint-disable */
import React from 'react';
import { Fade } from 'react-reveal';
import { Button, ButtonGroup, Container } from 'reactstrap';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {},
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps) {
    // reset page if items array has changed

    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  static getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 4;

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage;
    let endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i,
    );

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }

  setPage(page) {
    const { items } = this.props;
    let { pager } = this.state;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = Pagination.getPager(items.length, page);

    // get new page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  render() {
    const { pager } = this.state;

    return (
      <Container className="d-none d-lg-flex justify-content-center">
        <Fade left>
          <ButtonGroup>
            <Button color="info" onClick={() => this.setPage(1)}>
              First
            </Button>
            <Button
              color="info"
              onClick={() => this.setPage(pager.currentPage - 1)}
            >
              Previous
            </Button>
            {pager.pages.map((page, i) => (
              <Button key={i} color="info" onClick={() => this.setPage(page)}>
                {page}
              </Button>
            ))}
            <Button color="info" onClick={() => this.setPage(pager.totalPages)}>
              Last
            </Button>
          </ButtonGroup>
        </Fade>
      </Container>
    );
  }
}

export default Pagination;
