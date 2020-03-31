import React from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./paginationStyles.css";


const showedAroundCurrentPages = (page, count) => {
  if (page < 4) {
    return [1, 2, 3, 4, 5].filter(item => item <= count);
  } else if (page - 4 >= 0 && page + 2 <= count) {
    return [page - 2, page - 1, page, page + 1, page + 2];
  } else if (page + 1 === count) {
    return [page - 3, page - 2, page - 1, page, page + 1];
  } else {
    return [page - 4, page - 3, page - 2, page - 1, page];
  }
};

export const ShowedPages = ({ page, count, query, size, width }) => (
  <>
    {/* <ShowedFirstPage page={page} query={query} />
    {showedAroundCurrentPages(page, count).map((item, idx) => (
      <Link key={idx} to={`/home?query=${query}&page=${item}`}>
        {page !== item ? (
          <Button variant="outline-success">{item}</Button>
        ) : (
          <Button variant="success">{item}</Button>
        )}
      </Link>
    ))}
    <ShowedLastPage query={query} page={page} count={count} /> */}
    <Pagination variant="success" size={size}>
      {page - 4 >= 0 ? (
        <>
          <Link to={`/home?query=${query}&page=${page !== 1 ? page - 1 : 1}`}>
            <Pagination.Item active>{"<"}</Pagination.Item>
          </Link>
          {width >= 700 || width <= 450 ? (
            <>
              <Link to={`/home?query=${query}&page=${1}`}>
                <Pagination.Item active>{1}</Pagination.Item>
              </Link>

              <Pagination.Ellipsis />
            </>
          ) : null}
        </>
      ) : null}

      {showedAroundCurrentPages(page, count).map((item, idx) => (
        <>
          {page !== item ? (
            <Link to={`/home?query=${query}&page=${item}`}>
              <Pagination.Item active>{item}</Pagination.Item>
            </Link>
          ) : (
            <Pagination.Item>{item}</Pagination.Item>
          )}
        </>
      ))}
      {page + 2 < count ? (
        <>
          {width >= 700 || width <= 450 ? (
            <>
              <Pagination.Ellipsis />
              <Link to={`/home?query=${query}&page=${count}`}>
                <Pagination.Item active>{count}</Pagination.Item>
              </Link>
            </>
          ) : null}

          <Link
            to={`/home?query=${query}&page=${page === count ? page : page + 1}`}
          >
            <Pagination.Item href active>
              >
            </Pagination.Item>
          </Link>
        </>
      ) : null}
    </Pagination>
  </>
);
