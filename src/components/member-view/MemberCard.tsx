'use client';

import { GetAllMembersQuery } from '@/utils/__types/graphql.types';
import { useMemo } from 'react';
import { css } from 'styled-components';
import { CircleImage } from './CircleImage';
import { CardContainer } from './CardContainer';
import Link from 'next/link';

export const MemberCard = ({
  member,
  nameFilter,
}: {
  member: GetAllMembersQuery['allMembers'][0];
  nameFilter: string;
}) => {
  const memberFullName = `${member.firstName} ${member.lastName}`;

  const nameFilterRegex = useMemo(() => new RegExp(nameFilter, 'gi'), [nameFilter]);
  const displayName =
    nameFilter.length === 0 ? memberFullName : memberFullName.replace(nameFilterRegex, `<mark>$&</mark>`);

  return (
    <CardContainer as={Link} href={`/member/${member.id}`}>
      <CircleImage src={member.profilePictureUrl} alt={memberFullName} size={100} />
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
