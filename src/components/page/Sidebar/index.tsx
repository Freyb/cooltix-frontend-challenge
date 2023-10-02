'use client';

import theme from '@/utils/theme';
import styled, { css } from 'styled-components';
import { Checkbox } from './Checkbox';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px ${theme.colors.lightGray};
  margin-right: 1rem;
  padding: 2rem;
  min-width: 10rem;
`;

export const Sidebar = ({ stateList }: { stateList: string[] }) => {
  console.log('stateList', stateList);
  return (
    <SidebarContainer>
      <div
        css={css`
          font-size: 1.25rem;
          font-weight: bold;
        `}
      >
        States
      </div>
      <div
        css={css`
          margin-top: 1rem;
        `}
      >
        {stateList.map((state) => (
          <Checkbox
            key={state}
            label={state}
            css={css`
              margin-top: 0.25rem;
            `}
          />
        ))}
      </div>
    </SidebarContainer>
  );
};
