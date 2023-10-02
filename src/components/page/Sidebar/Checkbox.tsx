import { css } from 'styled-components';

export const Checkbox = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => {
  return (
    <div
      css={css`
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
      `}
      onClick={onClick}
    >
      <input
        type="checkbox"
        id={`state_${label}`}
        css={css`
          margin: 0;
          margin-right: 5px;
          margin-top: 2px;
        `}
        checked={active}
        onClick={onClick}
      />
      <label htmlFor={`state_$label`}>{label}</label>
    </div>
  );
};
