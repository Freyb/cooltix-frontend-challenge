import { UseOrderProps } from '@/hooks/useOrder';
import { css } from 'styled-components';

export const FilterButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: UseOrderProps['direction'];
  onClick: () => void;
}) => {
  return (
    <div onClick={onClick}>
      <div
        css={css`
          font-weight: ${active !== 'NONE' ? 'bold' : 'normal'};
        `}
      >
        {label}
      </div>
      {active === 'ASC' && <div>ASC</div>}
      {active === 'DESC' && <div>DESC</div>}
    </div>
  );
};
