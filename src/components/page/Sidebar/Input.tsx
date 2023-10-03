import breakpoints from '@/utils/breakpoints';
import Image from 'next/image';
import { css } from 'styled-components';

export const Input = ({ value, onChange }: { value: string; onChange: (newValue: string) => void }) => {
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <Image
        src="/magnifyingglass.svg"
        width={15}
        height={15}
        alt="search icon"
        css={css`
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
        `}
      />
      <input
        css={css`
          padding: 0.25em 0.5em;
          background-color: #fff;
          border: 2px solid currentColor;
          border-radius: 4px;
          transition: 180ms box-shadow ease-in-out;

          &:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px var(--primary-color-alpha);
            outline: 3px solid transparent;
          }

          @media (max-width: ${breakpoints.laptop}) {
            width: 100%;
          }
        `}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
