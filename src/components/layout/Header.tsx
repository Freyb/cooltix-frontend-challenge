'use client';

import Image from 'next/image';
import Link from 'next/link';
import { css } from 'styled-components';

import { PageContainer } from '@/components/control/PageContainer';

import logo from '../../../public/logo_white.svg';

export const Header = () => {
  return (
    <PageContainer
      css={css`
        background-color: var(--primary-color);
      `}
    >
      <Link href="/">
        <Image src={logo} alt="cooltix_logo" />
      </Link>
    </PageContainer>
  );
};
