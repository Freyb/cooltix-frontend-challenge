import { useState } from 'react';

export type UseOrderProps = {
  key: 'firstName' | 'lastName';
  direction: 'NONE' | 'ASC' | 'DESC';
};

export const useOrder = (initialValues?: UseOrderProps) => {
  const [orderKey, setOrderKey] = useState<UseOrderProps['key']>(initialValues?.key ?? 'firstName');
  const [orderDirection, setOrderDirection] = useState<UseOrderProps['direction']>(initialValues?.direction ?? 'NONE');

  const changeOrderKey = (newKey: UseOrderProps['key']) => {
    if (newKey !== orderKey) {
      setOrderKey(newKey);
      setOrderDirection('ASC');
    }
  };

  const cycleOrderDirection = () => {
    if (orderDirection === 'NONE') {
      setOrderDirection('ASC');
    } else if (orderDirection === 'ASC') {
      setOrderDirection('DESC');
    } else {
      setOrderDirection('NONE');
    }
  };

  return {
    orderKey,
    changeOrderKey,
    orderDirection,
    cycleOrderDirection,
  };
};
