'use client';

import Image from 'next/image';
import logo from '../../../public/logo_white.svg';
import { PageContainer } from '../control/PageContainer';
import { css } from 'styled-components';
import Link from 'next/link';

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
