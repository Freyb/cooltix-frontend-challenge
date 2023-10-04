'use client';

import breakpoints from '@/utils/breakpoints';
import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 1rem;
  @media (min-width: ${breakpoints.laptop}) {
    padding-left: 5rem;
    padding-right: 5rem;
  }
`;
