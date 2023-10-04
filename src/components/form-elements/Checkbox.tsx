import { RuleSet, css } from 'styled-components';

export const Checkbox = ({
  value,
  label,
  active,
  onClick,
  ...rest
}: {
  value: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
      {...rest}
    >
      <input
        type="checkbox"
        id={value}
        css={css`
          appearance: none;
          background-color: #fff;
          margin: 0.2rem 0.5rem 0 0;
          font: inherit;
          color: currentColor;
          width: 1.15em;
          height: 1.15em;
          border: 0.15em solid currentColor;
          border-radius: 0.15em;
          transform: translateY(-0.075em);
          display: grid;
          place-content: center;

          &:before {
            content: '';
            width: 0.65em;
            height: 0.65em;
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            box-shadow: inset 1em 1em var(--primary-color);
          }

          &:checked:before {
            transform: scale(1);
          }
        `}
        checked={active}
        onChange={onClick}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
};
