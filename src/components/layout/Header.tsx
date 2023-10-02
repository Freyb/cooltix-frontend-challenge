'use client';

import Image from 'next/image';
import logo from '../../../public/logo.svg';
import { Container } from '../control/Container';

export const Header = () => {
  return (
    <Container
      style={{
        backgroundColor: '#F5F5F5',
      }}
    >
      <Image src={logo} alt="cooltix_logo" />
    </Container>
  );
};
