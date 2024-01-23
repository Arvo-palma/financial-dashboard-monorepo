import { StyledLabel, StyledSpan } from '@/app/login/components/styles/styled-form';
import React from 'react';
import Show from './show';
import { StyledFullColumn } from './styles/styled-column';
import { StyledDynamicFlex } from './styles/styled-flex';

export type InputWrapperDirection = 'column' | 'row';
export interface InputWrapperProps {
  label?: string;
  error?: string;
  required?: boolean;
  children?: React.ReactNode;
  className?: string;
  labelFor?: string;
  direction?: InputWrapperDirection;
}
export const InputWrapper: React.FC<InputWrapperProps> = (props) => {
  return (
    <StyledDynamicFlex direction={props.direction || 'row'}>
      <Show when={!!props.label}>
        <StyledLabel htmlFor={props.labelFor} error={props.error} required={props.required}>
          {props.label}
        </StyledLabel>
      </Show>
      <StyledFullColumn>
        {props.children}
        <StyledSpan>{props.error ? '*' + props.error : null}</StyledSpan>
      </StyledFullColumn>
    </StyledDynamicFlex>
  );
};

export default InputWrapper;
