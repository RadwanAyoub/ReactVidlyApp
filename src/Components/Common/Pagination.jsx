import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Pagination extends Component {
  render() {
    const { pageSize, contentLength, onPageChange, currentPage } = this.props;
    const pageCount = Math.ceil(contentLength / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
      <nav aria-label="Pagination">
        <ul className="pagination">
          <li className={`page-item${currentPage > 1 ? "" : " disabled"}`}>
            <span className="page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</span>
          </li>
          {pages.map((page) => {
            return (
              <li
                key={page}
                className={`page-item${page === currentPage ? " active" : ""}`}
              >
                <a className="page-link" onClick={() => onPageChange(page)}>
                  {page}
                </a>
              </li>
            );
          })}
          <li
            className={`page-item${
              currentPage === pages[pages.length - 1] ? " disabled" : ""
            }`}
          >
            <a className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next</a>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.defaultProps = {
  pageSize: 3,
  contentLength: 3,
  currentPage: 1,
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  contentLength: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
