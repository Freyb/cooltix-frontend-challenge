import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useScrollBlock } from '@/hooks/useScrollBlock';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { css } from 'styled-components';

export const ImageOverlay = ({
  src,
  size,
  isOpen,
  setIsOpen,
}: {
  src: string;
  size: number;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}) => {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setIsOpen(false));
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    if (isOpen) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [isOpen, blockScroll, allowScroll]);

  return (
    <div
      css={css`
        display: ${isOpen ? 'flex' : 'none'};
        transform: ${isOpen ? 'scale(1)' : 'scale(0)'};
        transition: 120ms transform ease-in-out;
        position: fixed;
        background-color: rgba(255, 255, 255, 0.9);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        justify-content: center;
        align-items: center;
      `}
    >
      <div ref={wrapperRef}>
        <Image src={src} width={size} height={size} alt={src} />
      </div>
    </div>
  );
};
