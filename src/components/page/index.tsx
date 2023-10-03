'use client';

import { Member } from '@/utils/__types/graphql.types';
import { useMemo, useState } from 'react';
import { Container } from '../control/Container';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import styled from 'styled-components';
import { MemberCard } from './MemberCard';
import { useOrder } from '@/hooks/useOrder';

const MemberCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

export const MemberBoard = ({ members }: { members: Member[] }) => {
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

  const stateList = useMemo(
    () =>
      members
        .map((member) => member.address.state)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort(),
    [members],
  );

  return (
    <Container style={{ display: 'flex' }}>
      <Sidebar
        stateList={stateList}
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        toggleStateFilter={toggleStateFilter}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
      />
      <div>
        <Topbar order={order} setOrder={setOrder} />
        <MemberCardContainer>
          {orderedMembers.map((member) => (
            <MemberCard key={member.id} member={member} nameFilter={nameFilter} />
          ))}
        </MemberCardContainer>
      </div>
    </Container>
  );
};
