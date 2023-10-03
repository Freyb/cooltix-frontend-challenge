import styled from 'styled-components';

const SelectWrapper = styled.div`
  position: relative;

  &:after {
    --size: 0.3rem;
    position: absolute;
    content: '';
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
    pointer-events: none;
    width: 0.8em;
    height: 0.5em;
    background-color: black;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
`;

const StyledSelect = styled.select`
  appearance: none;
  width: 100%;
  font-size: 1.15rem;
  padding: 0.4em 3em 0.4em 1em;
  background-color: #fff;
  border: 2px solid currentColor;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;
  transition: 100ms box-shadow ease-in-out;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px var(--primary-color-alpha);
    outline: 3px solid transparent;
  }
`;

const StyledOption = styled.option`
  padding: 0.5rem 1rem;
`;

export const Select = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (newValue: string) => void;
  options: { key: any; value: any }[];
}) => {
  return (
    <SelectWrapper>
      <StyledSelect
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {options.map((option) => (
          <StyledOption key={option.key} value={option.key}>
            {option.value}
          </StyledOption>
        ))}
      </StyledSelect>
    </SelectWrapper>
  );
};
