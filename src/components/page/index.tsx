'use client';

import { GetAllMembersQuery, Member } from '@/utils/__types/graphql.types';
import { useMemo, useState } from 'react';
import { Container } from '../control/Container';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import styled, { css } from 'styled-components';
import { MemberCard } from './MemberCard';
import { useOrder } from '@/hooks/useOrder';
import { usePagination } from '@/hooks/usePagination';
import { PaginationNavigator } from './PaginationNavigator';
import breakpoints from '@/utils/breakpoints';

export const MemberBoard = ({ members }: { members: GetAllMembersQuery['allMembers'] }) => {
  const [stateFilter, setStateFilter] = useState<string[]>([]);

  const toggleStateFilter = (toggledState: string) => {
    if (stateFilter.includes(toggledState)) {
      setStateFilter(stateFilter.filter((state) => state !== toggledState));
    } else {
      setStateFilter([...stateFilter, toggledState]);
    }
  };

  const [nameFilter, setNameFilter] = useState('');

  const filteredMembers = useMemo(() => {
    let result = members;
    if (stateFilter.length > 0) {
      result = result.filter((member) => stateFilter.includes(member.address.state));
    }
    if (nameFilter.length > 0) {
      result = result.filter(
        (member) =>
          member.lastName.toLowerCase().includes(nameFilter.toLowerCase()) ||
          member.firstName.toLowerCase().includes(nameFilter.toLowerCase()),
      );
    }
    return result;
  }, [members, stateFilter, nameFilter]);

  const { order, setOrder } = useOrder();

  const orderedMembers = useMemo(() => {
    return [...filteredMembers].sort((a, b) => {
      const aProp = a[order.key];
      const bProp = b[order.key];

      return aProp.localeCompare(bProp) * (order.direction === 'ASC' ? 1 : -1);
    });
  }, [filteredMembers, order]);

  const {
    page,
    pageSize,
    numberOfPages,
    setPage,
    canStepForward,
    canStepBackward,
    stepForward,
    stepBackward,
    changePageSize,
    paginatedValue: paginatedMembers,
  } = usePagination({ values: orderedMembers, defaultPageSize: 9 });

  const stateList = useMemo(
    () =>
      members
        .map((member) => member.address.state)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort(),
    [members],
  );

  return (
    <Container>
      <div
        css={css`
          display: flex;
          justify-content: center;
          flex-direction: column;

          @media (min-width: ${breakpoints.laptop}) {
            flex-direction: row;
          }
        `}
      >
        <Sidebar
          stateList={stateList}
          stateFilter={stateFilter}
          setStateFilter={setStateFilter}
          toggleStateFilter={toggleStateFilter}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
        />
        <div
          css={css`
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          `}
        >
          <Topbar order={order} setOrder={setOrder} pageSize={pageSize} changePageSize={changePageSize} />
          <div
            css={css`
              flex-grow: 1;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-wrap: wrap;
                margin: -1rem;
                align-items: flex-start;
                justify-content: center;
              `}
            >
              {paginatedMembers.map((member) => (
                <MemberCard key={member.id} member={member} nameFilter={nameFilter} />
              ))}
            </div>
          </div>
          <PaginationNavigator
            page={page}
            pageSize={pageSize}
            numberOfPages={numberOfPages}
            setPage={setPage}
            canStepForward={canStepForward}
            canStepBackward={canStepBackward}
            stepForward={stepForward}
            stepBackward={stepBackward}
          />
        </div>
      </div>
    </Container>
  );
};
