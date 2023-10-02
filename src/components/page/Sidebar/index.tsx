'use client';

import theme from '@/utils/theme';
import styled, { css } from 'styled-components';
import { Checkbox } from './Checkbox';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px ${theme.colors.lightGray};
  margin-right: 1rem;
  padding: 2rem;
  min-width: 10rem;
`;

const FilterContainer = styled.div`
  margin-bottom: 2rem;
`;

const FilterTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ClearButton = styled.button`
  margin-bottom: 2rem;
  background-color: inherit;
  padding: 0.5rem 1rem;
  transition: background-color 100ms linear;
  &:hover {
    background-color: var(--primary-color);
  }
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
  return (
    <SidebarContainer>
      <ClearButton
        onClick={() => {
          setStateFilter([]);
          setNameFilter('');
        }}
      >
        Clear filters
      </ClearButton>
      <FilterContainer>
        <FilterTitle>Name</FilterTitle>
        <input type="text" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
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
    </SidebarContainer>
  );
};
