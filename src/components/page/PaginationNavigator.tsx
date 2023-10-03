'use client';

import theme from '@/utils/theme';
import ReactPaginate from 'react-paginate';
import styled, { css } from 'styled-components';

const PaginationContainer = styled(ReactPaginate)`
  display: flex;
  list-style-type: none;
  justify-content: center;
  padding: 0;
  margin: 1rem 0 0 0;
  & li {
    padding: 0.25rem 0.5rem;
    border: solid 1px ${theme.colors.lightGray};
    margin: 0 1rem;
    padding: 0;
    text-align: center;
    cursor: pointer;
    display: flex;
    width: 1.5rem;
    height: 1.5rem;
  }
  & li a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  & .selected {
    background-color: var(--primary-color);
    font-weight: bold;
  }
  & .previous {
  }
  & .next {
  }
`;

export const PaginationNavigator = ({
  page,
  pageSize,
  setPage,
  numberOfPages,
  canStepForward,
  canStepBackward,
  stepForward,
  stepBackward,
}: {
  page: number;
  pageSize: number;
  setPage: (newPage: number) => void;
  numberOfPages: number;
  canStepForward: boolean;
  canStepBackward: boolean;
  stepForward: () => void;
  stepBackward: () => void;
}) => {
  return (
    <PaginationContainer
      pageCount={numberOfPages}
      pageRangeDisplayed={numberOfPages}
      forcePage={page}
      onPageChange={(e) => {
        console.log(e);
        setPage(e.selected);
      }}
      previousLabel="<"
      nextLabel=">"
    />
  );
};
