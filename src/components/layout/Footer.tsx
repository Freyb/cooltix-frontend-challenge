'use client';

import Image from 'next/image';
import styled, { css } from 'styled-components';

import { SocialMediaButton } from '@/components/control/SocialMediaButton';

import logo from '../../../public/logo_white.svg';

const FooterSectionContainer = styled.div`
  margin-top: 1rem;
`;

export const Footer = () => {
  const cooltixEmail = process.env.NEXT_PUBLIC_COOLTIX_EMAIL;
  return (
    <div
      css={css`
        background-color: var(--gray-1);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        color: #fff;
      `}
    >
      <Image src={logo} alt="cooltix_logo" />
      <FooterSectionContainer>
        <a href={`mailto:${cooltixEmail}`}>{cooltixEmail}</a>
      </FooterSectionContainer>
      <FooterSectionContainer>
        <div>Follow us on networks</div>
      </FooterSectionContainer>
      <FooterSectionContainer>
        <div
          css={css`
            display: flex;
            & img {
              margin: 0 0.5rem;
            }
          `}
        >
          <SocialMediaButton src="/facebook.svg" href={process.env.NEXT_PUBLIC_COOLTIX_FACEBOOK!} size={25} />
          <SocialMediaButton src="/linkedin.svg" href={process.env.NEXT_PUBLIC_COOLTIX_LINKEDIN!} size={25} />
          <SocialMediaButton src="/instagram.svg" href={process.env.NEXT_PUBLIC_COOLTIX_INSTAGRAM!} size={25} />
        </div>
      </FooterSectionContainer>
    </div>
  );
};
