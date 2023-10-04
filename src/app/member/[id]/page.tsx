'use client';

import { ExternalLink } from '@/components/control/ExternalLink';
import { PageContainer } from '@/components/control/PageContainer';
import { CircleImage } from '@/components/member-view/CircleImage';
import { ContactButton } from '@/components/member-view/ContactButton';
import { HeaderOverlay } from '@/components/page/member/[id]/HeaderOverlay';
import { GetMemberQuery, GetMemberQueryVariables } from '@/utils/__types/graphql.types';
import { gql, useSuspenseQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import styled, { css } from 'styled-components';

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

const MemberName = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1.5rem;
`;

const DetailSectionContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledContactButton = styled(ContactButton)`
  margin-top: 0.5rem;
`;

export default function Page() {
  const params = useParams();
  const userId = params.id as string;
  const {
    data: { member },
  } = useSuspenseQuery<GetMemberQuery, GetMemberQueryVariables>(query, {
    variables: { id: userId },
  });

  if (!member) {
    return <></>;
  }

  const memberFullName = `${member.firstName} ${member.lastName}`;
  const { addressLine, city, state, postalCode, country } = member.address;

  return (
    <main>
      <PageContainer
        css={css`
          padding-top: 0;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 3rem;
            position: relative;
          `}
        >
          <HeaderOverlay $height="calc(3rem + 75px)" />
          <CircleImage src={member.profilePictureUrl} alt={memberFullName} size={150} />
          <MemberName>{memberFullName}</MemberName>
          <DetailSectionContainer>
            <div>
              {addressLine}, {city}
            </div>
            <div>
              {state} {postalCode}
            </div>
            <div>{country}</div>
            <ExternalLink
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${addressLine}, ${city}, ${state} ${postalCode}, ${country}`,
              )}`}
              icon="/external_link.svg"
            />
          </DetailSectionContainer>
          <DetailSectionContainer>
            <div
              css={css`
                font-size: 1.2rem;
                font-weight: bold;
              `}
            >
              Contacts
            </div>
            <StyledContactButton label={member.email} href={`mailto:${member.email}`} src="/email.svg" />
            <StyledContactButton label={member.phoneNumber} href={`tel:${member.phoneNumber}`} src="/phone.svg" />
          </DetailSectionContainer>
        </div>
      </PageContainer>
    </main>
  );
}
