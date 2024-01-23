import React from 'react';

import InputWrapper, { InputWrapperDirection } from '../../core/components/input-wrapper';
import { UncontrolledFormElement } from '../../core/types/theme-type';
import { StyledInput } from './styles/styled-form';

interface EmailInputProps extends UncontrolledFormElement {
  direction?: InputWrapperDirection;
}

export const EmailInput: React.FC<EmailInputProps> = React.forwardRef(
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
          type="email"
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

EmailInput.displayName = 'EmailInput';
export default EmailInput;
