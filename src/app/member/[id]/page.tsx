'use client';

import { PageContainer } from '@/components/control/PageContainer';
import { CircleImage } from '@/components/member-view/CircleImage';
import { ContactButton } from '@/components/member-view/ContactButton';
import { GetMemberQuery, GetMemberQueryVariables } from '@/utils/__types/graphql.types';
import { gql, useSuspenseQuery } from '@apollo/client';
import Image from 'next/image';
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
          <div
            css={css`
              position: absolute;
              top: 0;
              width: 100vw;
              height: calc(3rem + 75px);
              background: linear-gradient(var(--primary-color), var(--background-color));
              z-index: -1;
            `}
          />
          <CircleImage src={member.profilePictureUrl} alt={memberFullName} size={150} />
          <div
            css={css`
              margin-top: 1rem;
              font-weight: bold;
              font-size: 1.5rem;
            `}
          >
            {memberFullName}
          </div>
          <div
            css={css`
              margin-top: 1rem;
              text-align: center;
            `}
          >
            <div>
              {addressLine}, {city}
            </div>
            <div>
              {state} {postalCode}
            </div>
            <div>{country}</div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${addressLine}, ${city}, ${state} ${postalCode}, ${country}`,
              )}`}
              css={css`
                background-color: var(--primary-color);
                padding: 0.25rem 2rem 0.25rem 0.5rem;
                border-radius: 4px;
                color: var(--background-color);
                margin-top: 1rem;
                display: inline-block;
                position: relative;
              `}
            >
              Show on Google Maps
              <Image
                src={'/external_link.svg'}
                width={15}
                height={15}
                alt={'external link'}
                css={css`
                  position: absolute;
                  top: 50%;
                  right: 10px;
                  transform: translateY(-50%);
                  filter: invert(87%) sepia(16%) saturate(358%) hue-rotate(201deg) brightness(107%) contrast(105%);
                `}
              />
            </a>
          </div>
          <div
            css={css`
              margin-top: 2rem;
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
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
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
