import { MemberBoard } from '@/components/page';
import { getClient } from '@/utils/ApolloClient';
import { GetAllMembersQuery } from '@/utils/__types/graphql.types';
import { gql } from '@apollo/client';

const query = gql`
  query GetAllMembers {
    allMembers {
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
        __typename
      }
      phoneNumber
      profilePictureUrl
      __typename
    }
  }
`;

export default async function Page() {
  const { data } = await getClient().query<GetAllMembersQuery>({ query: query });

  console.log(data);

  return (
    <main>
      <MemberBoard members={data.allMembers} />
    </main>
  );
}
