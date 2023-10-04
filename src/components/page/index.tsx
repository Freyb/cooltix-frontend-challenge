'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useOrder } from '@/hooks/useOrder';
import { usePagination } from '@/hooks/usePagination';
import { GetAllMembersQuery } from '@/utils/__types/graphql.types';
import breakpoints from '@/utils/breakpoints';
import { useMemo, useState } from 'react';
import { css } from 'styled-components';

import { PageContainer } from '@/components/control/PageContainer';
import { PaginationNavigator } from '@/components/control/PaginationNavigator';
import { MemberBoard } from '@/components/member-view/MemberBoard';

import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const HomePage = ({ members }: { members: GetAllMembersQuery['allMembers'] }) => {
  const [stateFilter, setStateFilter] = useLocalStorage('stateFilter', useState<string[]>([]));

  const toggleStateFilter = (toggledState: string) => {
    if (stateFilter.includes(toggledState)) {
      setStateFilter(stateFilter.filter((state) => state !== toggledState));
    } else {
      setStateFilter([...stateFilter, toggledState]);
    }
  };

  const [nameFilter, setNameFilter] = useLocalStorage('nameFilter', useState(''));

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
    <PageContainer>
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
          <MemberBoard members={paginatedMembers} nameFilter={nameFilter} />
          <PaginationNavigator page={page} pageSize={pageSize} numberOfPages={numberOfPages} setPage={setPage} />
        </div>
      </div>
    </PageContainer>
  );
};
