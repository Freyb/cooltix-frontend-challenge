'use client';

import theme from '@/utils/theme';
import styled, { css } from 'styled-components';
import { Checkbox } from './Checkbox';
import { Input } from './Input';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;
const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px ${theme.colors.lightGray};
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

const ClearButton = styled.button`
  margin-bottom: 2rem;
  background-color: inherit;
  padding: 0.5rem 1rem;
  transition: box-shadow 120ms linear;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
  font-size: 1rem;
  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px var(--primary-color-alpha);
    outline: 3px solid transparent;
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
      <SidebarContent>
        <FilterTitle
          css={css`
            font-size: 1.25rem;
          `}
        >
          Filters
        </FilterTitle>
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
      </SidebarContent>
    </SidebarContainer>
  );
};
