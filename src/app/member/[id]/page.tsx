'use client';

import { MemberBoard } from '@/components/page';
import { GetMemberQuery, GetMemberQueryVariables } from '@/utils/__types/graphql.types';
import { gql, useSuspenseQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

const query = gql`
  query GetMember($id: ID!) {
    member(id: $id) {
      id
      lastName
      firstName
      email
      address {
        country
        state
        postalCode
        city
        addressLine
      }
      phoneNumber
      profilePictureUrl
    }
  }
`;

export default function Page() {
  const params = useParams();
  const userId = params.id as string;
  const { data } = useSuspenseQuery<GetMemberQuery, GetMemberQueryVariables>(query, {
    variables: { id: userId },
  });

  return <main>{data.member?.email}</main>;
}
