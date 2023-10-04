import Image from 'next/image';
import { css } from 'styled-components';
import { Icon } from './Icon';

export const ExternalLink = ({ href, icon }: { href: string; icon: string }) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      css={css`
        background-color: var(--primary-color);
        padding: 0.25rem 2rem 0.25rem 0.5rem;
        border-radius: 4px;
        color: var(--background-color);
        margin-top: 1rem;
        display: inline-block;
        position: relative;
      `}
    >
      Show on Google Maps
      {icon && (
        <Icon
          icon={icon}
          alt={icon}
          size={15}
          inline
          css={css`
            right: 10px;
            filter: invert(87%) sepia(16%) saturate(358%) hue-rotate(201deg) brightness(107%) contrast(105%);
          `}
        />
      )}
    </a>
  );
};
