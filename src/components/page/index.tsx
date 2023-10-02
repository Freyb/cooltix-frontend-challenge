'use client';

import { Member } from '@/utils/__types/graphql.types';
import { useState } from 'react';
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
  const [a, aa] = useState('');

  return (
    <Container style={{ display: 'flex' }}>
      <Sidebar />
      <div>
        <Topbar />
        <MemberCardContainer>
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </MemberCardContainer>
      </div>
    </Container>
  );
};
