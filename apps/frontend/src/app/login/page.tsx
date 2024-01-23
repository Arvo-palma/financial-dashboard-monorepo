'use client';
import React from 'react';
import {
  StyledLoginFormContainer,
  StyledMain,
  StyledMainColumn,
} from '../core/components/styles/styled-column';
import LoginForm from './components/login-screen';
import { StyledContainer } from './components/styles/styled-toast-container';

export interface PageProps {}
const Page: React.FC<PageProps> = () => {
  return (
    <StyledMain>
      <StyledMainColumn>
        <StyledLoginFormContainer>
          <LoginForm />
        </StyledLoginFormContainer>
      </StyledMainColumn>
      <StyledContainer hideProgressBar={true} icon={false} />
    </StyledMain>
  );
};

export default Page;
