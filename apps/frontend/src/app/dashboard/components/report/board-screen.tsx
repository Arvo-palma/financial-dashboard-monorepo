import { StyledMain } from '@/app/core/components/styles/styled-column';
import React from 'react';
import styled from 'styled-components';

export interface BoardScreenProps {
  children: React.ReactNode;
}
const BoardScreen: React.FC<BoardScreenProps> = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

export const StyledBoardScreen = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 40px;
  width: 100%;
`;

export default BoardScreen;
