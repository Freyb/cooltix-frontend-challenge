'use client';

import { OrderProps } from '@/hooks/useOrder';
import theme from '@/utils/theme';
import styled from 'styled-components';
import { Select } from './Select';

const TopbarContainer = styled.div`
  display: flex;
  border: solid 1px ${theme.colors.lightGray};
  margin-bottom: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  justify-content: right;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
`;

const SelectTitle = styled.div`
  margin-right: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
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
      <SelectContainer>
        <SelectTitle>Page size:</SelectTitle>
        <Select
          value={pageSize.toString()}
          onChange={(newValue: string) => {
            changePageSize(parseInt(newValue));
          }}
          options={paginationConfig.pageSizes.map((pageSize) => ({
            key: pageSize,
            value: pageSize,
          }))}
        />
      </SelectContainer>
      <SelectContainer>
        <SelectTitle>Order:</SelectTitle>
        <Select
          value={`${order.key}_${order.direction}`}
          onChange={(newValue) => {
            const [newOrderKey, newOrderDirection] = newValue.split('_') as [
              OrderProps['key'],
              OrderProps['direction'],
            ];
            setOrder({
              key: newOrderKey,
              direction: newOrderDirection,
            });
          }}
          options={(Object.entries as <T>(obj: T) => Array<[keyof T, T[keyof T]]>)(orderConfig).map(
            ([filterOption, label]) => ({
              key: filterOption,
              value: label,
            }),
          )}
        />
      </SelectContainer>
    </TopbarContainer>
  );
};
