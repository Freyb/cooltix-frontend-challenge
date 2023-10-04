import { GetAllMembersQuery } from '@/utils/__types/graphql.types';
import { css } from 'styled-components';

import { MemberCard } from './MemberCard';

export const MemberBoard = ({
  members,
  nameFilter,
}: {
  members: GetAllMembersQuery['allMembers'];
  nameFilter: string;
}) => {
  return (
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
        {members.map((member) => (
          <MemberCard key={member.id} member={member} nameFilter={nameFilter} />
        ))}
      </div>
    </div>
  );
};
