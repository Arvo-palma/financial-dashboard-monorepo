import React from 'react';
import { StyledForm } from './styles/styled-form';

export interface FormProps {
  onSubmit: () => void;
  children: React.ReactNode;
  submitOnPressEnter?: boolean;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  return (
    <StyledForm
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit();
      }}
    >
      {children}
    </StyledForm>
  );
};

export default Form;
