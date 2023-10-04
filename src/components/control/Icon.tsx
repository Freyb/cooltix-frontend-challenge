import Image from 'next/image';
import { css } from 'styled-components';

export const Icon = ({
  icon,
  size,
  alt,
  inline,
  ...rest
}: {
  icon: string;
  size: number;
  alt: string;
  inline?: boolean;
}) => {
  return (
    <Image
      src={icon}
      width={size}
      height={size}
      alt={alt}
      css={
        inline
          ? css`
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            `
          : undefined
      }
      {...rest}
    />
  );
};
