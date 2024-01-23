import InputWrapper, { InputWrapperDirection } from '@/app/core/components/input-wrapper';
import { UncontrolledFormElement } from '@/app/core/types/theme-type';
import React from 'react';
import { StyledInput } from './styles/styled-form';

interface PasswordInputProps extends UncontrolledFormElement {
  direction?: InputWrapperDirection;
}

export const PasswordInput: React.FC<PasswordInputProps> = React.forwardRef(
  ({ id, testId, label, direction, disabled, required, error, ...inputProps }, ref) => {
    return (
      <InputWrapper
        label={label}
        labelFor={id}
        error={error}
        direction={direction}
        required={required}
      >
        <StyledInput
          id={id}
          type="password"
          {...{ 'data-test-id': testId }}
          {...inputProps}
          error={error}
          disabled={disabled}
          required={required}
          ref={ref}
        />
      </InputWrapper>
    );
  }
);

PasswordInput.displayName = 'TextInput';
export default PasswordInput;
