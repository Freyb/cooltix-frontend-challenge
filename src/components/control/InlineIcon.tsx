import Image from 'next/image';
import { css } from 'styled-components';

export const InlineIcon = ({ icon, size, alt, ...rest }: { icon: string; size: number; alt: string }) => {
  return (
    <Image
      src={icon}
      width={size}
      height={size}
      alt={alt}
      css={css`
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      `}
      {...rest}
    />
  );
};
