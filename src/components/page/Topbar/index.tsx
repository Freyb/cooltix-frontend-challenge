'use client';

import { UseOrderProps } from '@/hooks/useOrder';
import theme from '@/utils/theme';
import styled from 'styled-components';
import { FilterButton } from './FilterButton';

const TopbarContainer = styled.div`
  display: flex;
  border: solid 1px ${theme.colors.lightGray};
  margin-bottom: 1rem;
  padding: 1rem;
`;

const filterButtonConfig = {
  firstName: 'First name',
  lastName: 'Last name',
};

export const Topbar = ({
  orderKey,
  changeOrderKey,
  orderDirection,
  cycleOrderDirection,
}: {
  orderKey: UseOrderProps['key'];
  changeOrderKey: (newKey: UseOrderProps['key']) => void;
  orderDirection: UseOrderProps['direction'];
  cycleOrderDirection: () => void;
}) => {
  return (
    <TopbarContainer>
      {(Object.entries as <T>(obj: T) => Array<[keyof T, T[keyof T]]>)(filterButtonConfig).map(([key, label]) => (
        <FilterButton
          key={key}
          label={label}
          active={orderKey === key ? orderDirection : 'NONE'}
          onClick={() => {
            if (orderKey === key) {
              cycleOrderDirection();
            } else {
              changeOrderKey(key);
            }
          }}
        />
      ))}
    </TopbarContainer>
  );
};
