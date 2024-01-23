import styled from 'styled-components';

type StyledLabelProps = {
  error?: string;
  required?: boolean;
};

type StyledInputProps = {
  error?: string;
  required?: boolean;
  disabled?: boolean;
};

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-self: center;
  width: 100%;
  max-width: 400px;
`;

export const StyledLabel = styled.label<StyledLabelProps>`
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  line-height: 1rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  &:after {
    margin-left: 0.125rem;
    color: #fca5a5;
  }
  ${(props: StyledLabelProps) => (props.error ? 'color: #F87171;' : 'color: #374151;')}
  ${(props: StyledLabelProps) => !props.required && 'display: none;'}
`;

export const StyledSpan = styled.span`
  margin-top: 0.25rem;
  height: 0;
  font-size: 0.6rem;
  line-height: 1rem;
  color: #f87171;
`;

export const StyledInput = styled.input<StyledInputProps>`
  display: inline;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  margin: 0;
  border-radius: 0.25rem;
  border-width: 1px;
  outline-style: none;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  ${(props: StyledInputProps) =>
    !props.error && !props.disabled
      ? 'border-color: #D1D5DB; &:focus { box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color); }; '
      : ''}
  ${(props: StyledInputProps) =>
    !props.disabled && props.error
      ? 'border-color: #FCA5A5; color: #EF4444; &:focus { border-color: #EF4444; box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color); --ring-color: #EF4444; }'
      : ''}
  ${(props: StyledInputProps) =>
    props.disabled
      ? 'border-color: #E5E7EB; color: #D1D5DB; background-color: #F9FAFB; cursor: not-allowed; '
      : ''}
`;
