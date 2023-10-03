import { useState } from 'react';

export type OrderProps = {
  key: 'firstName' | 'lastName';
  direction: 'ASC' | 'DESC';
};

export const useOrder = (initialValues?: OrderProps) => {
  const [order, setOrder] = useState<OrderProps>(initialValues || { key: 'firstName', direction: 'ASC' });

  return {
    order,
    setOrder,
  };
};
