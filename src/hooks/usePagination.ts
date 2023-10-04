import { useCallback, useEffect, useMemo, useState } from 'react';

import { useLocalStorage } from './useLocalStorage';

type Props<T> = {
  values: T[];
  defaultPageSize: number;
};

export const usePagination = <T>({ values, defaultPageSize }: Props<T>) => {
  const [page, _setPage] = useLocalStorage('pagination', 0);
  const [pageSize, setPageSize] = useLocalStorage('pagesize', defaultPageSize);

  const numberOfPages = useMemo(() => Math.ceil(values.length / pageSize), [values, pageSize]);

  const setPage = useCallback(
    (newPage: number) => {
      _setPage(newPage);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0 });
      }
    },
    [_setPage],
  );

  const changePageSize = (newPageSize: number): void => {
    setPageSize(newPageSize);
    setPage(0);
  };

  const canStepForward = page < numberOfPages;
  const canStepBackward = page > 0;

  const stepForward = () => {
    if (canStepForward) {
      setPage(page + 1);
    }
  };
  const stepBackward = () => {
    if (canStepBackward) {
      setPage(page - 1);
    }
  };

  const paginatedValue = useMemo(() => values.slice(page * pageSize, (page + 1) * pageSize), [values, page, pageSize]);

  return {
    page,
    pageSize,
    numberOfPages,
    setPage,
    canStepForward,
    canStepBackward,
    stepForward,
    stepBackward,
    changePageSize,
    paginatedValue,
  };
};
