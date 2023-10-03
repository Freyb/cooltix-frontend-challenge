'use client';

import breakpoints from '@/utils/breakpoints';
import styled, { css } from 'styled-components';
import { Checkbox } from '@/components/form-elements/Checkbox';
import { Input } from '@/components/form-elements/Input';
import { Button } from '@/components/form-elements/Button';
import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SidebarContainer } from './SidebarContainer';

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const FilterContainer = styled.div`
  margin-bottom: 2rem;
`;

const SidebarSectionTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
const SidebarSectionSubTitle = styled(SidebarSectionTitle)`
  font-size: 1.1rem;
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
        <SidebarSectionTitle
          css={css`
            font-size: 1.25rem;
          `}
        >
          Filters
        </SidebarSectionTitle>
        <Button
          onClick={() => {
            setStateFilter([]);
            setNameFilter('');
          }}
          css={css`
            margin-bottom: 2rem;
          `}
        >
          Clear filters
        </Button>
        <FilterContainer>
          <SidebarSectionSubTitle>Name</SidebarSectionSubTitle>
          <Input
            value={nameFilter}
            onChange={setNameFilter}
            css={css`
              @media (max-width: ${breakpoints.laptop}) {
                width: 100%;
              }
            `}
          />
        </FilterContainer>
        <FilterContainer>
          <SidebarSectionSubTitle>States</SidebarSectionSubTitle>
          <div>
            {stateList.map((state) => (
              <Checkbox
                key={state}
                value={`state_${state}`}
                label={state}
                active={stateFilter.includes(state)}
                onClick={() => toggleStateFilter(state)}
                css={css`
                  margin-top: 0.25rem;
                `}
              />
            ))}
          </div>
        </FilterContainer>
        {!isLaptop && <Button onClick={toggleOpen}>Done</Button>}
      </SidebarContent>
    </SidebarContainer>
  );
};
