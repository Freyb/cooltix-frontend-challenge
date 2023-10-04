import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useScrollBlock } from '@/hooks/useScrollBlock';
import { useCallback, useEffect, useRef } from 'react';
import { css } from 'styled-components';

import { Button } from '@/components/form-elements/Button';

export const SidebarContainer = ({
  isOpen,
  toggleOpen,
  isLaptop,
  children,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
  isLaptop: boolean;
  children: React.ReactNode;
}) => {
  const wrapperRef = useRef(null);
  const callback = useCallback(() => {
    if (isOpen) {
      toggleOpen();
    }
  }, [isOpen, toggleOpen]);
  useOutsideClick(wrapperRef, callback);
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    if (isOpen) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [isOpen, blockScroll, allowScroll]);

  if (isLaptop) {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-right: 1rem;
        `}
      >
        {children}
      </div>
    );
  }
  return (
    <>
      <Button onClick={toggleOpen}>Filters</Button>
      <div
        css={css`
          display: ${isOpen ? 'block' : 'none'};
          opacity : ${isOpen ? 'scale(1)' : 'scale(0)'};
          transition: 120ms transform ease-in-out;
          position: fixed;
          background-color: rgba(255, 255, 255, 0.9);
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 999;
          padding: 10rem; 20rem;
        `}
      >
        <div
          ref={wrapperRef}
          css={css`
            overflow: auto;
            height: 100%;
            border: solid 5px currentColor;
            border-radius: 10px;
            background-color: #fff;
          `}
        >
          {children}
        </div>
      </div>
    </>
  );
};
