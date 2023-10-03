'use client';

import { OrderProps } from '@/hooks/useOrder';
import theme from '@/utils/theme';
import styled from 'styled-components';

const TopbarContainer = styled.div`
  display: flex;
  border: solid 1px ${theme.colors.lightGray};
  margin-bottom: 1rem;
  padding: 1rem;
`;

const orderConfig: Record<`${OrderProps['key']}_${OrderProps['direction']}`, string> = {
  firstName_ASC: 'First name A-Z',
  firstName_DESC: 'First name Z-A',
  lastName_ASC: 'Last name A-Z',
  lastName_DESC: 'Last name Z-A',
};

const paginationConfig = {
  pageSizes: [9, 15, 30],
};

export const Topbar = ({
  order,
  setOrder,
  pageSize,
  changePageSize,
}: {
  order: OrderProps;
  setOrder: (newOrder: OrderProps) => void;
  pageSize: number;
  changePageSize: (newPageSize: number) => void;
}) => {
  return (
    <TopbarContainer>
      <div>
        <select
          value={`${order.key}_${order.direction}`}
          onChange={(e) => {
            const [newOrderKey, newOrderDirection] = e.target.value.split('_') as [
              OrderProps['key'],
              OrderProps['direction'],
            ];
            setOrder({
              key: newOrderKey,
              direction: newOrderDirection,
            });
          }}
        >
          {(Object.entries as <T>(obj: T) => Array<[keyof T, T[keyof T]]>)(orderConfig).map(([filterOption, label]) => (
            <option key={filterOption} value={filterOption}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={pageSize}
          onChange={(e) => {
            changePageSize(parseInt(e.target.value));
          }}
        >
          {paginationConfig.pageSizes.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </TopbarContainer>
  );
};
