'use client';

import { Member } from '@/utils/__types/graphql.types';
import { useMemo, useState } from 'react';
import { Container } from '../control/Container';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import styled from 'styled-components';
import { MemberCard } from './MemberCard';

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

  const stateList = useMemo(
    () =>
      members
        .map((member) => member.address.state)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort(),
    [members],
  );

  const filteredMembers =
    stateFilter.length === 0 ? members : members.filter((member) => stateFilter.includes(member.address.state));

  return (
    <Container style={{ display: 'flex' }}>
      <Sidebar stateList={stateList} stateFilter={stateFilter} toggleStateFilter={toggleStateFilter} />
      <div>
        <Topbar />
        <MemberCardContainer>
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </MemberCardContainer>
      </div>
    </Container>
  );
};
