import React from 'react';
import { css } from 'styled-components';

export const NavigationButton = ({
  onClick,
  href,
  leftIcon,
  rightIcon,
  children,
  ...rest
}: {
  onClick?: () => void;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div
      onClick={onClick}
      css={css`
        display: flex;
        align-items: center;
      `}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </div>
  );
};
