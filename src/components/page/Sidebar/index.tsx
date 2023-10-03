'use client';

import breakpoints from '@/utils/breakpoints';
import styled, { css } from 'styled-components';
import { Checkbox } from './Checkbox';
import { Input } from './Input';
import { Button } from './Button';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useScrollBlock } from '@/hooks/useScrollBlock';

const SidebarContainer = ({
  isOpen,
  toggleOpen,
  isLaptop,
  children,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
  isLaptop: boolean;
  children: React.ReactNode;
}) => {
  const wrapperRef = useRef(null);
  const callback = useCallback(() => {
    if (isOpen) {
      toggleOpen();
    }
  }, [isOpen, toggleOpen]);
  useOutsideClick(wrapperRef, callback);
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    if (isOpen) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [isOpen, blockScroll, allowScroll]);

  if (isLaptop) {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-right: 1rem;
        `}
      >
        {children}
      </div>
    );
  }
  return (
    <>
      <Button onClick={toggleOpen}>Filters</Button>
      <div
        css={css`
          display: ${isOpen ? 'block' : 'none'};
          opacity : ${isOpen ? 'scale(1)' : 'scale(0)'};
          transition: 120ms transform ease-in-out;
          position: fixed;
          background-color: rgba(255, 255, 255, 0.9);
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 999;
          padding: 10rem; 20rem;
        `}
      >
        <div
          ref={wrapperRef}
          css={css`
            overflow: auto;
            height: 100%;
            border: solid 5px currentColor;
            border-radius: 10px;
            background-color: #fff;
          `}
        >
          {children}
        </div>
      </div>
    </>
  );
};

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const FilterContainer = styled.div`
  margin-bottom: 2rem;
`;

const FilterTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const Sidebar = ({
  stateList,
  stateFilter,
  setStateFilter,
  toggleStateFilter,
  nameFilter,
  setNameFilter,
}: {
  stateList: string[];
  stateFilter: string[];
  setStateFilter: (states: string[]) => void;
  toggleStateFilter: (state: string) => void;
  nameFilter: string;
  setNameFilter: (nameFilter: string) => void;
}) => {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((v) => !v);
  };
  const isLaptop = useMediaQuery({ type: 'min', breakpoint: breakpoints.laptop });

  return (
    <SidebarContainer isOpen={isOpen} toggleOpen={toggleOpen} isLaptop={isLaptop}>
      <SidebarContent>
        <FilterTitle
          css={css`
            font-size: 1.25rem;
          `}
        >
          Filters
        </FilterTitle>
        <Button
          onClick={() => {
            setStateFilter([]);
            setNameFilter('');
          }}
        >
          Clear filters
        </Button>
        <FilterContainer>
          <FilterTitle>Name</FilterTitle>
          <Input value={nameFilter} onChange={setNameFilter} />
        </FilterContainer>
        <FilterContainer>
          <FilterTitle>States</FilterTitle>
          <div>
            {stateList.map((state) => (
              <Checkbox
                key={state}
                label={state}
                active={stateFilter.includes(state)}
                onClick={() => toggleStateFilter(state)}
              />
            ))}
          </div>
        </FilterContainer>
        {!isLaptop && <Button onClick={toggleOpen}>Done</Button>}
      </SidebarContent>
    </SidebarContainer>
  );
};
