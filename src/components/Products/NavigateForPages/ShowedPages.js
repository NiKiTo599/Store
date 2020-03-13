import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ShowedFirstPage = ({ page, query }) => (
  <>
    {page - 4 >= 0 ? (
      <Link to={`/home?query=${query}&page=1`}>
        <Button variant="outline-success">1</Button>
        <span>...</span>
      </Link>
    ) : null}
  </>
);

const ShowedLastPage = ({ page, count, query }) => (
  <>
    {page + 2 < count ? (
      <Link to={`/home?query=${query}&page=${count}`}>
        <span>...</span>
        <Button variant="outline-success">{count}</Button>
      </Link>
    ) : null}
  </>
);

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

export const ShowedPages = ({ page, count, query }) => (
  <>
    <ShowedFirstPage page={page} query={query} />
    {showedAroundCurrentPages(page, count).map((item, idx) => (
      <Link key={idx} to={`/home?query=${query}&page=${item}`}>
        {page !== item ? (
          <Button variant="outline-success">{item}</Button>
        ) : (
          <Button variant="success">{item}</Button>
        )}
      </Link>
    ))}
    <ShowedLastPage query={query} page={page} count={count} />
  </>
);
