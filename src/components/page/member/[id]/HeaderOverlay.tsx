import styled from 'styled-components';

export const HeaderOverlay = styled.div<{ $height: string }>`
  position: absolute;
  top: 0;
  width: 100vw;
  height: ${(props) => props.$height};
  background: linear-gradient(var(--primary-color), var(--background-color));
  z-index: -1;
`;
