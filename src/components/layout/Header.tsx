'use client';

import Image from 'next/image';
import logo from '../../../public/logo_white.svg';
import { PageContainer } from '../control/PageContainer';
import { css } from 'styled-components';

export const Header = () => {
  return (
    <PageContainer
      css={css`
        background-color: var(--primary-color);
      `}
    >
      <Image src={logo} alt="cooltix_logo" />
    </PageContainer>
  );
};
