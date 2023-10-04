'use client';

import { ExternalLink } from '@/components/control/ExternalLink';
import { Icon } from '@/components/control/Icon';
import { ImageOverlay } from '@/components/control/ImageOverlay';
import { NavigationButton } from '@/components/control/NavigationButton';
import { PageContainer } from '@/components/control/PageContainer';
import { CircleImage } from '@/components/member-view/CircleImage';
import { ContactButton } from '@/components/member-view/ContactButton';
import { HeaderOverlay } from '@/components/page/member/[id]/HeaderOverlay';
import { GetMemberQuery, GetMemberQueryVariables } from '@/utils/__types/graphql.types';
import breakpoints from '@/utils/breakpoints';
import { gql, useSuspenseQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
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
  const rounter = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const {
    data: { member },
  } = useSuspenseQuery<GetMemberQuery, GetMemberQueryVariables>(query, {
    variables: { id: userId },
  });
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);

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
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
              width: 90%;
            `}
          >
            <NavigationButton
              onClick={() => rounter.back()}
              css={css`
                color: var(--background-color);
                font-weight: bold;
                position: absolute;
                left: 0;
                top: 0;

                @media (min-width: ${breakpoints.laptop}) {
                  display: none;
                }
              `}
              leftIcon={
                <Icon
                  icon="/left_arrow.svg"
                  alt="back"
                  size={15}
                  css={css`
                    filter: invert(87%) sepia(16%) saturate(358%) hue-rotate(201deg) brightness(107%) contrast(105%);
                  `}
                />
              }
            >
              Back
            </NavigationButton>
            <CircleImage
              src={member.profilePictureUrl}
              alt={memberFullName}
              size={150}
              onClick={() => {
                console.log('open');
                setOverlayIsOpen(true);
              }}
              css={css`
                cursor: pointer;
              `}
            />
            <ImageOverlay
              src={member.profilePictureUrl}
              size={300}
              isOpen={overlayIsOpen}
              setIsOpen={setOverlayIsOpen}
            />
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
        </div>
      </PageContainer>
    </main>
  );
}
