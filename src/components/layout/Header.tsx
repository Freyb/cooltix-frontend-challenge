'use client';

import Image from 'next/image';
import logo from '../../../public/logo.svg';
import { PageContainer } from '../control/PageContainer';

export const Header = () => {
  return (
    <PageContainer
      style={{
        backgroundColor: '#F5F5F5',
      }}
    >
      <Image src={logo} alt="cooltix_logo" />
    </PageContainer>
  );
};
