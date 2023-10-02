'use client';

import { Member } from '@/utils/__types/graphql.types';
import Image from 'next/image';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: solid 1px #f5f5f5;
  padding: 2rem;
`;

const ImageContainer = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 100px;
  height: 100px;
`;

export const MemberCard = ({ member }: { member: Member }) => {
  const memberFullName = `${member.firstName} ${member.lastName}`;
  return (
    <CardContainer>
      <ImageContainer>
        <Image src={member.profilePictureUrl} width={100} height={100} alt={memberFullName} />
      </ImageContainer>
      <div
        style={{
          marginTop: '1rem',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        {memberFullName}
      </div>
      <div
        style={{
          marginTop: '1rem',
        }}
      >{`${member.address.state}, ${member.address.postalCode}`}</div>
      <div
        style={{
          marginTop: '1rem',
          fontSize: '0.75rem',
        }}
      >
        <div>{member.address.addressLine}</div>
        <div style={{ fontWeight: 500 }}>{member.address.city}</div>
      </div>
    </CardContainer>
  );
};
