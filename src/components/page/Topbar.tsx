'use client';

import { OrderProps } from '@/hooks/useOrder';
import styled from 'styled-components';

import { Select } from '@/components/form-elements/Select';

const TopbarContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  justify-content: right;
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
      <Select
        label="Page size:"
        value={pageSize.toString()}
        onChange={(newValue: string) => {
          changePageSize(parseInt(newValue));
        }}
        options={paginationConfig.pageSizes.map((pageSize) => ({
          key: pageSize,
          value: pageSize,
        }))}
      />
      <Select
        label="Order:"
        value={`${order.key}_${order.direction}`}
        onChange={(newValue) => {
          const [newOrderKey, newOrderDirection] = newValue.split('_') as [OrderProps['key'], OrderProps['direction']];
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
    </TopbarContainer>
  );
};
