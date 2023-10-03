import { HomePage } from '@/components/page';
import { getClient } from '@/utils/ApolloClient';
import { GetAllMembersQuery } from '@/utils/__types/graphql.types';
import { gql } from '@apollo/client';

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

  console.log(data);

  return (
    <main>
      <HomePage members={data.allMembers} />
    </main>
  );
}
