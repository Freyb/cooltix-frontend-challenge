'use client';

import { Member } from '@/utils/__types/graphql.types';
import theme from '@/utils/theme';
import Image from 'next/image';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: solid 1px ${theme.colors.lightGray};
  padding: 2rem;
`;

const ImageContainer = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 100px;
  height: 100px;
`;

export const MemberCard = ({ member, nameFilter }: { member: Member; nameFilter: string }) => {
  const memberFullName = `${member.firstName} ${member.lastName}`;

  const nameFilterRegex = useMemo(() => new RegExp(nameFilter, 'gi'), [nameFilter]);
  const displayName =
    nameFilter.length === 0 ? memberFullName : memberFullName.replace(nameFilterRegex, `<mark>$&</mark>`);

  return (
    <CardContainer>
      <ImageContainer>
        <Image src={member.profilePictureUrl} width={100} height={100} alt={memberFullName} />
      </ImageContainer>
      <div
        css={css`
          margin-top: 1rem;
          font-weight: bold;
          font-size: 1.2rem;
        `}
        dangerouslySetInnerHTML={{ __html: displayName }}
      />
      <div
        css={css`
          margin-top: 1rem;
        `}
      >{`${member.address.state}, ${member.address.postalCode}`}</div>
      <div
        css={css`
          margin-top: 1rem;
          font-size: 0.75rem;
        `}
      >
        <div>{member.address.addressLine}</div>
        <div
          css={css`
            font-weight: 500;
          `}
        >
          {member.address.city}
        </div>
      </div>
    </CardContainer>
  );
};
