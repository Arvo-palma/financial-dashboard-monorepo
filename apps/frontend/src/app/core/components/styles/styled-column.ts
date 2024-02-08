'use client';
import styled from 'styled-components';
import Column from '../column';

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  @media (min-width: 820px) {
    flex-direction: row;
  }
  width: 100%;
`;

export const StyledColumn = styled(Column)`
  display: flex;
  flex-direction: column;
`;

export const StyledFullColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledMainColumn = styled(StyledColumn)`
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
`;

export const StyledLoginFormContainer = styled(StyledColumn)`
  padding: 2rem;
  align-self: center;
  border-radius: 0.5rem;
  border-width: 1px;
  width: 100%;
  background-color: #ffffff;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-width: 400px;
`;
