import Image from 'next/image';
import { css } from 'styled-components';

export const ContactButton = ({ label, href, src, ...rest }: { label: string; href: string; src: string }) => {
  return (
    <div {...rest}>
      <a href={href}>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Image src={src} width={20} height={20} alt={label} />
          <div
            css={css`
              margin-left: 0.5rem;
            `}
          >
            {label}
          </div>
        </div>
      </a>
    </div>
  );
};
