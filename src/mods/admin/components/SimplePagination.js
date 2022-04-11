import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Input } from '@chakra-ui/react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .pages {
    display: flex;
    align-items: center;

    .total-count {
      margin-left: 0.5rem;
    }
  }
`;

const SimplePagination = ({ initialPage, totalCount, onChangePage, pageSize }) => {
  const [page, setPage] = useState(initialPage);
  const [inputPage, setInputPage] = useState(initialPage);

  const lastPageNumber = Math.floor((totalCount + (pageSize - 1)) / pageSize);

  const handleChangeInputPage = (ev) => {
    const newPage = parseInt(ev.target.value, 10);
    if (Number.isInteger(newPage) && newPage >= 1 && newPage <= lastPageNumber) {
      setInputPage(newPage);
    }
  };

  const handleBlurPageInput = useCallback(() => {
    setPage(inputPage);
    onChangePage(inputPage);
  }, [inputPage]);

  const handleClickPreviousPage = useCallback(() => {
    setPage(page - 1);
    setInputPage(page - 1);
    onChangePage(page - 1);
  }, [page]);

  const handleClickNextPage = useCallback(() => {
    setPage(page + 1);
    setInputPage(page + 1);
    onChangePage(page + 1);
  }, [page]);

  return (
    <Wrapper>
      <Button variant="link" size="sm" disabled={page === 1} onClick={handleClickPreviousPage}>
        <LeftOutlined />
      </Button>
      <div className="pages">
        <Input
          size="md"
          width="3.5rem"
          value={inputPage}
          onChange={handleChangeInputPage}
          onBlur={handleBlurPageInput}
        />
        <div className="total-count">{`/ ${lastPageNumber}`}</div>
      </div>
      <Button
        variant="link"
        size="sm"
        disabled={page >= lastPageNumber}
        onClick={handleClickNextPage}
      >
        <RightOutlined />
      </Button>
    </Wrapper>
  );
};

SimplePagination.propTypes = {
  initialPage: PropTypes.number,
  totalCount: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
};

SimplePagination.defaultProps = {
  initialPage: 1,
};

export default SimplePagination;
