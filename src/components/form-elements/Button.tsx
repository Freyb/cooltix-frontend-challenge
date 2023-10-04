import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
  outline: none;
  border: none;
  font-size: 1rem;
  font-family: inherit;
  background-color: var(--primary-color);
  color: var(--background-color);
  transition: background-color 120ms linear;
  &:hover {
    background-color: var(--primary-color-darken);
  }
`;
