import { getClient } from '@/utils/ApolloClient';
import { GetAllMembersQuery } from '@/utils/__types/graphql.types';
import { gql } from '@apollo/client';

import { HomePage } from '@/components/page';

const query = gql`
  query GetAllMembers {
    allMembers {
      id
      lastName
      firstName
      address {
        country
        state
        postalCode
        city
        addressLine
      }
      profilePictureUrl
    }
  }
`;

export default async function Page() {
  const { data } = await getClient().query<GetAllMembersQuery>({ query: query });

  return (
    <main>
      <HomePage members={data.allMembers} />
    </main>
  );
}
